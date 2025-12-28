import { useMemo } from "react";
import { Shape, ShapeGeometry, MeshStandardMaterial } from "three";

export function Table() {
  const tableShape = useMemo(() => {
    const width = 7.2;
    const straightDepth = 2.4;
    const radius = width / 2;

    const shape = new Shape();

    // Start at bottom-left corner (player side)
    shape.moveTo(-radius, 0);

    // Bottom edge (player side, straight)
    shape.lineTo(radius, 0);

    // Right edge going up
    shape.lineTo(radius, straightDepth);

    // Semicircle arc at the dealer side (top)
    shape.absarc(0, straightDepth, radius, 0, Math.PI, false);

    // Left edge going down (completes the shape)
    shape.lineTo(-radius, 0);

    return shape;
  }, []);

  const tableGeometry = useMemo(
    () => new ShapeGeometry(tableShape, 128),
    [tableShape]
  );

  const baseMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#1b6b5b",
        roughness: 0.55,
        metalness: 0.06,
        side: 2, // DoubleSide
      }),
    []
  );

  return (
    <group position={[0, 0.8, -2]}>
      {/* Flat table surface */}
      <mesh
        geometry={tableGeometry}
        material={baseMaterial}
        rotation-x={Math.PI / 2}
        position={[0, 0.2, 0]}
        castShadow
        receiveShadow
      />
    </group>
  );
}
