import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
  useGLTF,
} from "@react-three/drei";
import { useControls } from "leva";
import { Suspense, useEffect } from "react";
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
const defaultModelName = availableModels[0]?.fileName ?? EMPTY_MODEL_VALUE;

function SelectedModel({ modelUrl }: { modelUrl: string }) {
  const gltf = useGLTF(modelUrl);
  return <primitive object={gltf.scene as Group} position={[0, 0, 0]} />;
}

function ModelLoadingFallback({ selectedModel }: { selectedModel: string }) {
  const { progress, loaded, total, item } = useProgress();
  const isSelectedModelItem = item?.includes(selectedModel) ?? false;

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
  const hasModels = availableModels.length > 0;
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

  return (
    <>
      <PerspectiveCamera makeDefault position={[4.5, 3, 5.5]} fov={80} />
      <color attach="background" args={["#4c6295"]} />
      <ambientLight intensity={0.6} />
      <directionalLight castShadow intensity={4} position={[5, 7, 6]} />
      {selectedModelUrl ? (
        <Suspense
          fallback={<ModelLoadingFallback selectedModel={selectedModel} />}
        >
          <SelectedModel key={selectedModelUrl} modelUrl={selectedModelUrl} />
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
      <OrbitControls enableDamping />
    </>
  );
}

export default function ModelsPlayground({ isThree }: SceneProps) {
  return isThree ? <ModelsPlaygroundThree /> : null;
}
