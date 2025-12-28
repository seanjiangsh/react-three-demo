import { useMemo, type JSX } from "react";
import { RoundedBox } from "@react-three/drei";

const CARD_SIZE: [number, number, number] = [0.65, 0.04, 0.45];

type CardProps = JSX.IntrinsicElements["group"] & {
  tint: string;
};

function Card({ tint, ...groupProps }: CardProps) {
  return (
    <group {...groupProps}>
      <RoundedBox
        args={CARD_SIZE}
        radius={0.03}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#f8f8f8"
          roughness={0.35}
          metalness={0.05}
        />
      </RoundedBox>
      <RoundedBox
        args={[CARD_SIZE[0] * 0.7, 0.002, CARD_SIZE[2] * 0.7]}
        position={[0, CARD_SIZE[1] * 0.5 + 0.002, 0]}
        radius={0.02}
        smoothness={2}
      >
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={0.15}
          roughness={0.4}
        />
      </RoundedBox>
    </group>
  );
}

export function Cards() {
  const dealerCards = useMemo(
    () => [
      {
        position: [-0.25, 1.1, -1.1] as [number, number, number],
        rotation: [-0.1, 0.08, -0.2] as [number, number, number],
        tint: "#e63946",
      },
      {
        position: [0.25, 1.12, -1.0] as [number, number, number],
        rotation: [-0.12, -0.05, 0.16] as [number, number, number],
        tint: "#1d3557",
      },
    ],
    []
  );

  const playerCards = useMemo(
    () => [
      {
        position: [-0.4, 1.1, 1.05] as [number, number, number],
        rotation: [-0.08, 0.12, -0.28] as [number, number, number],
        tint: "#e9c46a",
      },
      {
        position: [0.0, 1.12, 1.1] as [number, number, number],
        rotation: [-0.1, -0.04, 0.16] as [number, number, number],
        tint: "#2a9d8f",
      },
      {
        position: [0.4, 1.09, 1.0] as [number, number, number],
        rotation: [-0.06, 0.05, 0.32] as [number, number, number],
        tint: "#f4a261",
      },
    ],
    []
  );

  return (
    <group>
      {dealerCards.map((card, idx) => (
        <Card
          key={`dealer-${idx}`}
          tint={card.tint}
          position={[
            card.position[0],
            card.position[1] + 0.06,
            card.position[2],
          ]}
          rotation={card.rotation}
        />
      ))}
      {playerCards.map((card, idx) => (
        <Card
          key={`player-${idx}`}
          tint={card.tint}
          position={[
            card.position[0],
            card.position[1] + 0.06,
            card.position[2],
          ]}
          rotation={card.rotation}
        />
      ))}
    </group>
  );
}
