import { folder, Leva, useControls } from "leva";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  defaultScene,
  pathFromScene,
  sceneFromPath,
  sceneKeys,
} from "@src/scenes/Scenes";
import { useSceneStore } from "@src/stores/useSceneStore";

const sceneOptions = sceneKeys.reduce<Record<string, string>>((acc, key) => {
  acc[key] = key;
  return acc;
}, {});

export function GlobalControls() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentScene,
    setCurrentScene,
    showAxisHelpers,
    setShowAxisHelpers,
    canvasPointerEvents,
    setCanvasPointerEvents,
  } = useSceneStore();

  useEffect(() => {
    const resolved = sceneFromPath(location.pathname);
    if (resolved !== currentScene) {
      setCurrentScene(resolved ?? defaultScene);
    }
  }, [location.pathname, currentScene, setCurrentScene]);

  useEffect(() => {
    if (!currentScene) return;
    navigate(pathFromScene(currentScene), { replace: true });
  }, [currentScene, navigate]);

  useControls(
    "Scene",
    {
      Scene: {
        options: sceneOptions,
        value: currentScene || defaultScene,
        onChange: (value) => setCurrentScene(value),
      },
    },
    { collapsed: false },
    [currentScene]
  );

  useControls(
    "Misc",
    {
      "Axis Helpers": folder({
        "Show Axis": {
          value: showAxisHelpers,
          onChange: (value) => setShowAxisHelpers(value),
        },
      }),
      Pointer: folder({
        "Pointer Events": {
          value: canvasPointerEvents,
          options: { Auto: "auto", Disabled: "none" },
          onChange: (value) => setCanvasPointerEvents(value),
        },
      }),
    },
    { collapsed: true, order: 9999 }
  );

  return <Leva theme={{ sizes: { rootWidth: "400px" } }} collapsed />;
}
