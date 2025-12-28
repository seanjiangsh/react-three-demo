# React Three Fiber + Vite

React + TypeScript + Vite starter wired for @react-three/fiber with @react-three/drei helpers. Scenes are hash-routed and registered from a central `Scenes` map so you can add demos without touching the router.

## Getting started

```bash
npm install
npm run dev
```

## Available scripts

- npm run dev — start the Vite dev server
- npm run build — type-check and produce a production build
- npm run preview — serve the production build locally
- npm run lint — run ESLint across the project

## Scene notes

- Canvas is full-screen; overlay text rides above each scene.
- Scenes are declared in `src/scenes/Scenes.ts` and auto-routed via `HashRouter`.
- Use the Leva panel to swap scenes, toggle helpers, or disable pointer events.

## Build warning

Three.js bundles can exceed the default chunk size warning threshold. This project builds successfully; adjust Vite chunk splitting if you want to silence the warning.
