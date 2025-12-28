import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Object3D, type Group } from "three";

import type { SceneProps } from "@src/scenes/types";
import { CameraRig } from "@src/scenes/Blackjack/CameraRig";
import { Lighting } from "@src/scenes/Blackjack/Lighting";
import { Table } from "@src/scenes/Blackjack/Table";
import { Ground } from "@src/scenes/Blackjack/Ground";
import { Cards } from "@src/scenes/Blackjack/Cards";
import { DealerZone, DeckZone, PlayerZone } from "@src/scenes/Blackjack/Zones";

function BlackjackThree() {
  const accentTarget = useMemo(() => new Object3D(), []);
  const accentLight = useRef<Group>(null);
  const sceneGroup = useRef<Group>(null);

  // Responsive scaling based on viewport aspect ratio
  useFrame(({ size }) => {
    if (sceneGroup.current) {
      const aspect = size.width / size.height;
      // Scale down the scene on narrow viewports to keep table visible
      const scale = aspect < 1.2 ? aspect / 1.2 : 1;
      sceneGroup.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      <color attach="background" args={["#06080f"]} />
      <fog attach="fog" args={["#06080f", 16, 36]} />
      <CameraRig />
      <Lighting />
      <group ref={sceneGroup}>
        <primitive object={accentTarget} position={[0, 1, -0.5]} />
        <group ref={accentLight} position={[0, 2.6, -3.2]}>
          <directionalLight
            intensity={0.6}
            color="#7fd0ff"
            target={accentTarget}
          />
        </group>
        <Table />
        <DealerZone />
        <PlayerZone />
        <DeckZone />
        <Cards />
        <Ground />
        {/* <ContactShadows
          position={[0, 0.75, 0]}
          scale={14}
          blur={2.4}
          opacity={0.4}
          far={3}
        /> */}
      </group>
      <OrbitControls enableDamping enablePan={false} maxPolarAngle={Math.PI} />
    </>
  );
}

export default function Blackjack({ isThree, containerRef }: SceneProps) {
  return isThree ? <BlackjackThree /> : null;
}
