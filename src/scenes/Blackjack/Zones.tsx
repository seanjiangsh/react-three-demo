import { useRef } from "react";
import type { Group } from "three";

export function DealerZone() {
  const ref = useRef<Group>(null);
  return <group ref={ref} name="DealerZone" position={[0, 1.05, -1.2]} />;
}

export function PlayerZone() {
  const ref = useRef<Group>(null);
  return <group ref={ref} name="PlayerZone" position={[0, 1.05, 1.2]} />;
}

export function DeckZone() {
  const ref = useRef<Group>(null);
  return <group ref={ref} name="DeckZone" position={[2.2, 1.05, 0]} />;
}
