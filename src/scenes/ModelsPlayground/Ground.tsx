export function Ground() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#c8c8c8" roughness={0.9} />
    </mesh>
  );
}
