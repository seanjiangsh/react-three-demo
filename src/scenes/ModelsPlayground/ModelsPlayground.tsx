import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
  useGLTF,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import {
  Box3,
  MathUtils,
  PerspectiveCamera as ThreePerspectiveCamera,
  Sphere,
  Vector3,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Group } from "three";

import type { SceneProps } from "@src/scenes/types";

type ModelDefinition = {
  fileName: string;
  displayName: string;
  url: string;
};

// Discover all glTF models in the local models folder at build time.
const modelModules = import.meta.glob("./models/*.{glb,gltf}", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const availableModels: ModelDefinition[] = Object.entries(modelModules)
  .map(([path, url]) => {
    const fileName = path.split("/").pop();
    if (!fileName) return null;
    const displayName = fileName.replace(/\.[^.]+$/, "");
    return {
      fileName,
      displayName,
      url,
    };
  })
  .filter((model): model is ModelDefinition => model !== null)
  .sort((a, b) => a.displayName.localeCompare(b.displayName));

const modelOptions = availableModels.reduce<Record<string, string>>(
  (acc, model) => {
    acc[model.displayName] = model.fileName;
    return acc;
  },
  {},
);

const modelUrlByName = availableModels.reduce<Record<string, string>>(
  (acc, model) => {
    acc[model.fileName] = model.url;
    return acc;
  },
  {},
);

const EMPTY_MODEL_VALUE = "__no_model_available__";
const defaultModelName = availableModels.at(-1)?.fileName ?? EMPTY_MODEL_VALUE;

const box = new Box3();
const sphere = new Sphere();
const center = new Vector3();
const size = new Vector3();
const viewDirection = new Vector3();

function fitCameraToObject(
  object: Group,
  camera: ThreePerspectiveCamera,
  controls: OrbitControlsImpl | null,
) {
  object.updateWorldMatrix(true, true);
  box.setFromObject(object);

  if (box.isEmpty()) return;

  box.getCenter(center);
  box.getSize(size);
  box.getBoundingSphere(sphere);

  const fitOffset = 1;
  const minFov = 30;
  const maxFov = 80;
  const aspect = Math.max(camera.aspect, 0.1);

  const targetDistance = Math.max(0.001, camera.position.distanceTo(center));
  const fovByHeight =
    2 * Math.atan((size.y * fitOffset) / (2 * targetDistance));
  const fovByWidth =
    2 * Math.atan((size.x * fitOffset) / (2 * targetDistance * aspect));
  const requiredFovDeg = MathUtils.radToDeg(Math.max(fovByHeight, fovByWidth));
  const clampedFov = MathUtils.clamp(requiredFovDeg, minFov, maxFov);

  const maxFovRad = MathUtils.degToRad(clampedFov);
  const minDistanceForHeight =
    (size.y * fitOffset) / (2 * Math.tan(maxFovRad / 2));
  const minDistanceForWidth =
    (size.x * fitOffset) / (2 * Math.tan(maxFovRad / 2) * aspect);
  const minDistanceForSphere =
    (sphere.radius * fitOffset) / Math.sin(maxFovRad / 2);
  const distance = Math.max(
    minDistanceForHeight,
    minDistanceForWidth,
    minDistanceForSphere,
    0.1,
  );

  viewDirection.subVectors(camera.position, controls?.target ?? center);
  if (viewDirection.lengthSq() === 0) {
    viewDirection.set(1, 0.45, 1);
  }
  viewDirection.normalize();

  camera.position.copy(center).addScaledVector(viewDirection, distance);
  camera.fov = clampedFov;
  camera.updateProjectionMatrix();

  if (controls) {
    controls.target.copy(center);
    controls.update();
  }
}

function SelectedModel({
  modelUrl,
  onModelReady,
}: {
  modelUrl: string;
  onModelReady?: (model: Group | null) => void;
}) {
  const gltf = useGLTF(modelUrl);
  const modelScene = useMemo(() => {
    // Avoid mutating cached GLTF scene directly; use a visible clone per selection.
    const instance = gltf.scene.clone(true) as Group;
    instance.visible = true;
    return instance;
  }, [gltf.scene]);

  useEffect(() => {
    onModelReady?.(modelScene);
    return () => {
      onModelReady?.(null);
    };
  }, [modelScene, onModelReady]);

  return <primitive object={modelScene} position={[0, 0, 0]} dispose={null} />;
}

function ModelLoadingFallback({ selectedModel }: { selectedModel: string }) {
  const { progress, loaded, total, item } = useProgress();
  const decodedItem = item ? decodeURIComponent(item) : "";
  const isSelectedModelItem =
    (item?.includes(selectedModel) ?? false) ||
    decodedItem.includes(selectedModel);

  useEffect(() => {
    if (!isSelectedModelItem) return;
    console.log(
      `Loading progress: ${Math.round(progress)}% (${loaded}/${total}) ${item ?? ""}`,
    );
  }, [isSelectedModelItem, progress, loaded, total, item]);

  return (
    <Html center>
      <div
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          background: "rgba(11,18,36,0.72)",
          border: "1px solid rgba(140,170,220,0.45)",
          color: "#d9e7ff",
          fontSize: "12px",
          letterSpacing: "0.04em",
          fontWeight: 600,
        }}
      >
        Loading model {Math.round(progress)}%
      </div>
    </Html>
  );
}

function ModelsPlaygroundThree() {
  const { size: viewportSize } = useThree();
  const hasModels = availableModels.length > 0;
  const previousModelUrlRef = useRef<string | undefined>(undefined);
  const cameraRef = useRef<ThreePerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const activeModelRef = useRef<Group | null>(null);
  const selectionOptions = hasModels
    ? modelOptions
    : { "No models found in ./models": EMPTY_MODEL_VALUE };

  const { Model: selectedModel } = useControls(
    "Models Playground",
    {
      Model: {
        value: defaultModelName,
        options: selectionOptions,
      },
    },
    [hasModels],
  );

  const selectedModelUrl = hasModels
    ? modelUrlByName[selectedModel]
    : undefined;

  useEffect(() => {
    const previousModelUrl = previousModelUrlRef.current;

    if (previousModelUrl && previousModelUrl !== selectedModelUrl) {
      // Drop stale model from loader cache so long sessions with many models don't bloat memory.
      console.log(
        `[ModelsPlayground] Clearing cached model: ${previousModelUrl}`,
      );
      useGLTF.clear(previousModelUrl);
    }

    previousModelUrlRef.current = selectedModelUrl;
  }, [selectedModelUrl]);

  useEffect(() => {
    return () => {
      if (!previousModelUrlRef.current) return;
      console.log(
        `[ModelsPlayground] Clearing cached model on unmount: ${previousModelUrlRef.current}`,
      );
      useGLTF.clear(previousModelUrlRef.current);
    };
  }, []);

  const fitActiveModelToCamera = useCallback(() => {
    if (!activeModelRef.current || !cameraRef.current) return;
    fitCameraToObject(
      activeModelRef.current,
      cameraRef.current,
      controlsRef.current,
    );
  }, []);

  const handleModelReady = useCallback(
    (model: Group | null) => {
      activeModelRef.current = model;
      if (!model) return;
      fitActiveModelToCamera();
    },
    [fitActiveModelToCamera],
  );

  useEffect(() => {
    fitActiveModelToCamera();
  }, [fitActiveModelToCamera, viewportSize.width, viewportSize.height]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[4.5, 3, 5.5]}
        fov={80}
      />
      <color attach="background" args={["#4c6295"]} />
      <ambientLight intensity={1} />
      <directionalLight castShadow intensity={4} position={[5, 7, 6]} />
      <directionalLight castShadow intensity={1} position={[-10, -10, -10]} />
      {selectedModelUrl ? (
        <Suspense
          fallback={<ModelLoadingFallback selectedModel={selectedModel} />}
        >
          <SelectedModel
            key={selectedModelUrl}
            modelUrl={selectedModelUrl}
            onModelReady={handleModelReady}
          />
        </Suspense>
      ) : (
        <Html center>
          <div
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              background: "rgba(11,18,36,0.72)",
              border: "1px solid rgba(140,170,220,0.45)",
              color: "#d9e7ff",
              fontSize: "12px",
              letterSpacing: "0.04em",
              fontWeight: 600,
            }}
          >
            No .glb/.gltf models found in ./models
          </div>
        </Html>
      )}
      <OrbitControls ref={controlsRef} enableDamping />
    </>
  );
}

export default function ModelsPlayground({ isThree }: SceneProps) {
  return isThree ? <ModelsPlaygroundThree /> : null;
}
