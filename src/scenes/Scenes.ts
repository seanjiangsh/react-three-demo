import type { SceneComponent } from "@src/scenes/types";
import SpinningBox from "@src/scenes/SpinningBox/SpinningBox";
import Blackjack from "@src/scenes/Blackjack/Blackjack";

export const Scenes: Record<string, SceneComponent> = {
  "Spinning-Box": SpinningBox,
  Blackjack,
};

export const sceneKeys = Object.keys(Scenes);

export const defaultScene = sceneKeys[0];

export const pathFromScene = (sceneKey: string) => `/${sceneKey.toLowerCase()}`;

export const sceneFromPath = (path: string) =>
  sceneKeys.find((key) => path.toLowerCase() === pathFromScene(key)) ??
  defaultScene;
