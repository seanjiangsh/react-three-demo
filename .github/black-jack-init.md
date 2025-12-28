---

## Instruction Prompt: React-Three-Fiber Blackjack Scene (Initial Scaffold)

You are generating a **React + react-three-fiber** project scaffold for a **realistic 3D blackjack table scene**.

### Project Goals

- Create an **initial 3D scene setup only**
- No full gameplay logic
- No final assets required
- Focus on **scene structure, camera, lighting, and component layout**
- Code must be clean, modular, and production-ready

---

### Tech Stack

- React (functional components)
- react-three-fiber
- @react-three/drei
- three
- GSAP (for future animation hooks)
- TypeScript preferred

---

### Scene Requirements

#### Camera

- Perspective camera
- Positioned at a realistic casino-table angle
- Slight downward tilt toward the table center
- Camera setup should be isolated into its own component

#### Lighting

Use physically plausible lighting:

- One primary directional light (key light)

  - Casts shadows
  - Soft shadow configuration

- One ambient or hemisphere light for fill
- Optional rim or accent light (low intensity)

Lighting must be modular and adjustable.

---

### Scene Objects (Placeholders Only)

#### Table

- Represent the blackjack table as a simple mesh:

  - Rounded rectangle or plane
  - Slight thickness

- Positioned at world origin
- Receives shadows

#### Card Area (No Cards Yet)

- Define logical groups only:

  - Dealer area
  - Player area
  - Deck / tray position

- Use empty `group` nodes with clear naming

#### Ground / Shadow Catcher

- Invisible or subtle plane beneath table
- Receives shadows
- Used to ground the scene visually

---

### Architecture Guidelines

Structure components like this (suggested):

- `<BlackjackScene />`

  - `<CameraRig />`
  - `<Lighting />`
  - `<Table />`
  - `<DealerZone />`
  - `<PlayerZone />`
  - `<DeckZone />`

Each component:

- Encapsulates its own mesh/group
- Uses `useRef` where animation will later attach
- Avoids business logic

---

### Rendering & Settings

- Enable shadows globally
- Use physically correct lights
- Set renderer tone mapping and output encoding appropriately
- Configure device pixel ratio responsibly

---

### Code Style

- TypeScript types for refs and props
- Clear comments explaining _why_, not _what_
- No placeholder magic numbers without comments
- Prepare hooks for future animations (e.g., `useFrame`, GSAP refs)

---

### Explicit Non-Goals (Do NOT implement)

- Card logic
- Card dealing
- Physics engines
- UI overlays
- Textures or real assets
- Sound

---

### Output Expectation

- Provide a **single coherent scaffold**
- Multiple components in one file is acceptable
- Focus on correctness and extensibility
- The scene should render a believable empty blackjack table setup

---

### Mental Model

Think like you are preparing the **foundation for a AAA casino table**, not a demo.

The result should feel ready for:

- Card dealing animations
- Camera motion
- Realistic shadows
- Later UI overlay integration

---
