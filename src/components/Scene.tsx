import { useMemo, useRef } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import type { SceneComponent } from "@src/scenes/types";
import { useSceneSize } from "@src/hooks/useSceneSize";
import { useSceneStore } from "@src/stores/useSceneStore";

export type SceneShellProps = {
  sceneKey: string;
  SceneComponent: SceneComponent;
};

export function SceneShell({ sceneKey, SceneComponent }: SceneShellProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const size = useSceneSize(shellRef);
  const { showAxisHelpers, canvasPointerEvents } = useSceneStore();

  const overlay = useMemo(
    () => <SceneComponent isThree={false} />,
    [SceneComponent]
  );

  return (
    <div className="scene-shell" ref={shellRef} data-scene={sceneKey}>
      <div className="scene-overlay">{overlay}</div>
      <Canvas
        className="scene-canvas"
        shadows
        style={{ pointerEvents: canvasPointerEvents }}
        dpr={window.devicePixelRatio}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
          gl.shadowMap.enabled = true;
        }}
      >
        <Suspense fallback={null}>
          <SceneComponent isThree containerRef={shellRef} />
          {showAxisHelpers && <axesHelper args={[4]} />}
        </Suspense>
      </Canvas>
      <div className="scene-meta">
        <span>{sceneKey}</span>
        <span>
          {Math.round(size.width)} x {Math.round(size.height)}
        </span>
      </div>
    </div>
  );
}
