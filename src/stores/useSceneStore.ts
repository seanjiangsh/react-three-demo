import { create } from "zustand";

export type CanvasPointerMode = "auto" | "none";

export type SceneStore = {
  currentScene: string;
  showAxisHelpers: boolean;
  canvasPointerEvents: CanvasPointerMode;
  setCurrentScene: (scene: string) => void;
  setShowAxisHelpers: (value: boolean) => void;
  setCanvasPointerEvents: (mode: CanvasPointerMode) => void;
  resolveSceneFromHash: (
    hash: string,
    scenes: string[],
    fallback: string
  ) => string;
  initSceneFromHash: (
    hash: string,
    scenes: string[],
    fallback: string
  ) => string;
};

export const useSceneStore = create<SceneStore>((set, get) => ({
  currentScene: "",
  showAxisHelpers: true,
  canvasPointerEvents: "auto",
  setCurrentScene: (currentScene) => set({ currentScene }),
  setShowAxisHelpers: (showAxisHelpers) => set({ showAxisHelpers }),
  setCanvasPointerEvents: (canvasPointerEvents) => set({ canvasPointerEvents }),
  resolveSceneFromHash: (hash, scenes, fallback) => {
    const normalizedHash = hash
      .replace(/^#/, "")
      .replace(/^\//, "")
      .toLowerCase();
    const match = scenes.find(
      (scene) => scene.toLowerCase() === normalizedHash
    );
    return match ?? fallback;
  },
  initSceneFromHash: (hash, scenes, fallback) => {
    const resolved = get().resolveSceneFromHash(hash, scenes, fallback);
    set({ currentScene: resolved });
    return resolved;
  },
}));
