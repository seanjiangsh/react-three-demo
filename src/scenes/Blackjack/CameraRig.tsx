import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import type { Group, PerspectiveCamera as PerspectiveCameraType } from "three";

export function CameraRig() {
  const rig = useRef<Group>(null);
  const cameraRef = useRef<PerspectiveCameraType>(null);

  const {
    Position: position,
    Rotation: rotation,
    FOV: fov,
  } = useControls(
    "Camera",
    {
      Position: {
        value: [0, 7.5, 5],
        step: 0.1,
        label: "Position",
      },
      Rotation: {
        value: [-1.1, 0, 0],
        step: 0.01,
        label: "Rotation",
      },
      FOV: {
        value: 48,
        min: 10,
        max: 120,
        step: 1,
        label: "FOV",
      },
    }
    // { collapsed: true }
  );

  // Update camera rotation and fov on every frame
  useFrame(() => {
    if (!cameraRef.current) return;
    cameraRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <group ref={rig}>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={position}
        fov={fov}
      />
    </group>
  );
}
