import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import { GlobalControls } from "@src/components/GlobalControls";
import { SceneShell } from "@src/components/Scene";
import {
  defaultScene,
  pathFromScene,
  Scenes,
  sceneKeys,
} from "@src/scenes/Scenes";
import "@src/App.css";

function SceneRoutes() {
  return (
    <Routes>
      {sceneKeys.map((sceneKey) => {
        const SceneComponent = Scenes[sceneKey];
        return (
          <Route
            key={sceneKey}
            path={pathFromScene(sceneKey)}
            element={
              <SceneShell sceneKey={sceneKey} SceneComponent={SceneComponent} />
            }
          />
        );
      })}
      <Route
        path="*"
        element={<Navigate to={pathFromScene(defaultScene)} replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <HashRouter>
      <GlobalControls />
      <SceneRoutes />
    </HashRouter>
  );
}

export default App;
