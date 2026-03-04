Love it — this is the correct starting point.

You don’t need to become a full 3D artist.
You just need a **focused blackjack-table modeling workflow**.

Below is a **beginner-friendly but production-minded checklist**.

---

# 🎯 Goal

Model a **realistic blackjack table** in Blender that:

- Looks believable under real lighting
- Works cleanly in Three.js
- Exports properly as `.glb`
- Is not overcomplicated

---

# 🧱 Phase 1 — Basic Scene Setup (5–10 min)

### ✅ Units

- Scene → Units → Metric
- Unit scale: 1.0
  (1 Blender unit = 1 meter → matches Three.js world scale)

### ✅ Real-world scale reference

A standard blackjack table is approximately:

- Width: **2.4–2.8 meters**
- Depth: **1.2–1.4 meters**
- Height: **0.75 meters**

Don’t eyeball scale. Type exact values.

---

# 🟢 Phase 2 — Table Base (Core Shape)

### Step 1 — Start with a Cube

- Scale it to:
  - X: 2.6m
  - Y: 1.3m
  - Z: 0.75m

Apply scale:
`Ctrl + A → Apply Scale`

---

### Step 2 — Shape the Front Curve

Blackjack tables are NOT perfect semicircles.

- Go to Edit Mode
- Select front vertices
- Use proportional editing (O key)
- G + X to curve it slightly

Alternative:

- Add a Bezier curve modifier
- Or use a boolean cutter for precision

Don’t overthink. Slight curve is enough.

---

# 🟤 Phase 3 — Add the Wooden Rail (Critical for Realism)

This is what makes it look real.

### Method (Beginner Safe):

1. Duplicate top face
2. Separate it (`P → Selection`)
3. Extrude outward slightly
4. Add thickness (Solidify modifier)
5. Add **Bevel modifier**

### 🔥 Important:

Add small bevels:

- 2–3 segments
- Width: 0.005–0.01m

Without bevels → lighting looks fake.

---

# 🟩 Phase 4 — Felt Surface

- Select top inner face
- Separate as new object
- Slightly lower it (0.01m)

This becomes:

- Separate material
- Separate mesh
- Shadow receiver

---

# ✨ Phase 5 — Shading & Normals

### Smooth Shading

- Right click → Shade Smooth

### Auto Smooth

- Object Data → Normals → Auto Smooth: 30°

This prevents ugly shading artifacts.

---

# 🎨 Phase 6 — Materials (Simple but Correct)

You only need 3 materials:

### 1️⃣ Felt

- Principled BSDF
- Base color: deep green (#0b3b2e)
- Roughness: 0.8–0.9
- No metallic

Optional later:

- Add subtle noise texture

---

### 2️⃣ Wood Rail

- Brown base
- Roughness: 0.4–0.6
- Metallic: 0
- Add slight clearcoat (0.2)

---

### 3️⃣ Table Body

- Dark neutral
- Roughness 0.6

Don’t overbuild nodes. Keep simple.

---

# 📦 Phase 7 — Geometry Cleanup Checklist

Before export:

✅ Apply all transforms (`Ctrl + A`)
✅ Remove doubles (Merge by distance)
✅ No ngons on visible surfaces (optional but good)
✅ Normals facing outward
✅ Object origin centered at world 0,0,0
✅ Pivot at center of table

---

# 🚀 Phase 8 — Export to GLB (For Three.js)

File → Export → glTF 2.0

Settings:

- Format: GLB
- Apply Modifiers: ✔
- Include → Selected Objects
- +Y Up
- Apply Transform: ✔

That’s it.

---

# 🧠 Beginner Mistakes to Avoid

❌ No bevels
❌ Unrealistic scale
❌ Too many subdivisions
❌ 500k polygon table
❌ Forgetting to apply scale
❌ Complex shader nodes
❌ Modeling chips and details too early

---

# 🎯 Target Poly Count

For a table:

- 10k–40k triangles is perfect.
- Under 80k is still fine.

This is extremely cheap for modern GPUs.

---

# 🧩 After This

Once table works in Three.js, next upgrades:

- Embroidered felt text (texture)
- Edge wear normal map
- Slight imperfections
- Under-table structure
- Subtle bump for felt

But not now.

---

# Your Next Step

Open Blender and only do:

1. Base shape
2. Rail
3. Felt separation
4. Bevel
5. Export

Stop there.

---
