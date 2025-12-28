import type { ReactElement, RefObject } from "react";

export type SceneProps = {
  isThree?: boolean;
  containerRef?: RefObject<HTMLDivElement | null>;
};

export type SceneComponent = (props: SceneProps) => ReactElement | null;
