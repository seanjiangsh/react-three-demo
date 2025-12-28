import { Color } from "three";

export function Lighting() {
  const keyColor = new Color("#ffe7c7");
  return (
    <group>
      <hemisphereLight
        intensity={0.55}
        color={"#f5f8ff"}
        groundColor={"#20252f"}
      />
      <directionalLight
        castShadow
        intensity={1.35}
        color={keyColor}
        position={[0, 8, -6]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00025}
      />
      <directionalLight
        intensity={0.6}
        color={"#9fc7ff"}
        position={[-5, 5, 4]}
      />
    </group>
  );
}
