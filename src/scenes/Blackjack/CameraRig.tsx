import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import type { Group, PerspectiveCamera as PerspectiveCameraType } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Default camera configuration
const DEFAULT_POSITION: [number, number, number] = [0, 7.5, 5];
const DEFAULT_ROTATION: [number, number, number] = [-1.1, 0, 0];
const DEFAULT_FOV = 48;

export function CameraRig() {
  const rig = useRef<Group>(null);
  const cameraRef = useRef<PerspectiveCameraType>(null);
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  const [
    { manualControl, Position: position, Rotation: rotation, FOV: fov },
    set,
  ] = useControls(
    "Camera",
    () => ({
      manualControl: {
        value: false,
        label: "Manual Control",
      },
      Position: {
        value: DEFAULT_POSITION,
        step: 0.1,
        label: "Position",
      },
      Rotation: {
        value: DEFAULT_ROTATION,
        step: 0.01,
        label: "Rotation",
      },
      FOV: {
        value: DEFAULT_FOV,
        min: 10,
        max: 120,
        step: 1,
        label: "FOV",
      },
    }),
    // { collapsed: true }
  );

  // Reset camera to defaults when toggling manual control
  useEffect(() => {
    if (cameraRef.current) {
      // Reset camera position and rotation physically
      cameraRef.current.position.set(...DEFAULT_POSITION);
      cameraRef.current.rotation.set(...DEFAULT_ROTATION);
      cameraRef.current.updateProjectionMatrix();
    }

    // Reset OrbitControls state
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }

    // Reset Leva values
    set({
      Position: DEFAULT_POSITION,
      Rotation: DEFAULT_ROTATION,
      FOV: DEFAULT_FOV,
    });
  }, [manualControl, set]);

  // Update camera rotation when manual control is enabled
  useFrame(() => {
    if (!cameraRef.current || !manualControl) return;
    cameraRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      <group ref={rig}>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={position}
          fov={fov}
        />
      </group>
      <OrbitControls
        ref={orbitControlsRef}
        enabled={!manualControl}
        enableDamping
        enablePan={false}
        maxPolarAngle={Math.PI}
      />
    </>
  );
}
