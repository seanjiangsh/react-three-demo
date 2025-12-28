export function Ground() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#6176a9" roughness={0.9} />
    </mesh>
  );
}
