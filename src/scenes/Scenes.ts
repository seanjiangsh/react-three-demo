import type { SceneComponent } from "@src/scenes/types";
import SpinningBox from "@src/scenes/SpinningBox/SpinningBox";
import Blackjack from "@src/scenes/Blackjack/Blackjack";
import ModelsPlayground from "@src/scenes/ModelsPlayground/ModelsPlayground";

export const Scenes: Record<string, SceneComponent> = {
  "Spinning-Box": SpinningBox,
  Blackjack,
  "Models-Playground": ModelsPlayground,
};

export const sceneKeys = Object.keys(Scenes);

export const defaultScene = "Models-Playground";

export const pathFromScene = (sceneKey: string) => `/${sceneKey.toLowerCase()}`;

export const sceneFromPath = (path: string) =>
  sceneKeys.find((key) => path.toLowerCase() === pathFromScene(key)) ??
  defaultScene;
