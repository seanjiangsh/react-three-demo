import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import type { Mesh } from "three";

import type { SceneProps } from "@src/scenes/types";

function SpinningBoxScene() {
  const cube = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!cube.current) return;
    cube.current.rotation.x += delta * 0.6;
    cube.current.rotation.y += delta * 0.9;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[4, 3.5, 6]} fov={50} />
      <color attach="background" args={["#050915"]} />
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        intensity={1.5}
        position={[5, 7, 6]}
        shadow-mapSize={[2048, 2048]}
      />
      <Environment preset="studio" />
      <mesh ref={cube} castShadow position={[0, 0.9, 0]}>
        <boxGeometry args={[1.3, 1.3, 1.3]} />
        <meshStandardMaterial
          color="#7cc7ff"
          metalness={0.2}
          roughness={0.25}
        />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.05, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#0b1224" roughness={0.9} />
      </mesh>
      <ContactShadows
        position={[0, -0.05, 0]}
        blur={2.2}
        opacity={0.4}
        scale={12}
        far={4}
      />
      <OrbitControls enableDamping />
    </>
  );
}

export default function SpinningBox({ isThree }: SceneProps) {
  return isThree ? <SpinningBoxScene /> : null;
}
