import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@src/App.tsx";
import "@src/index.css";
import { defaultScene, pathFromScene, sceneKeys } from "@src/scenes/Scenes";
import { useSceneStore } from "@src/stores/useSceneStore";

const initialScene = useSceneStore
  .getState()
  .initSceneFromHash(window.location.hash, sceneKeys, defaultScene);

if (!window.location.hash) {
  window.location.hash = `#${pathFromScene(initialScene)}`;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
