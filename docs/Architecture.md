# Symbolic Lab Architecture

## Overview

The Symbolic Lab is designed as a layered simulation environment. It strictly separates the mathematical model (The Engine) from the application state (The Store) and the presentation (The UI).

## 1. The Core Engine (`src/lib/scm`)

The Engine is a standalone TypeScript library that implements the SCM v3.1 equations. It has **no dependencies** on React, Zustand, or the DOM.

* **`SCM_Entity`**: Represents a single node. Holds state ($T, E, S, I, P$) and handles its own differential evolution (`update(dt)`).
* **`SCM_System`**: The physics world. Manages the collection of entities and global fields ($E_f, NW$). Handles $O(N^2)$ interactions like Fusion.
* **`math.ts`**: Pure functions for the raw calculus.

## 2. The Simulation Loop (`src/hooks/useGameLoop.ts`)

The simulation is driven by a `requestAnimationFrame` loop.

1. **Time Step**: Calculates `dt` (delta time) since the last frame.
2. **Step**: Calls `store.step(dt)`.
3. **Engine Update**: The store calls `system.step(dt)`, which advances the math.

## 3. State Management (`src/store/useSCMStore.ts`)

We use **Zustand** to bridge the Engine and React.

* **Transient Updates**: The `system` instance is mutable. We do *not* clone the entire system every frame (for performance).
* **Reactive Updates**: UI components (like the Control Panel) subscribe to specific state changes (e.g., `isRunning`, `simulationSpeed`).
* **Canvas Rendering**: The Canvas reads directly from the `system` reference to render at 60fps without triggering React reconciliations for every position change.

## 4. Visualization (`src/components/viz`)

* **`SimulationCanvas`**: The main viewport.
* **`SymbolNode`**: Renders an entity. Uses **Framer Motion** for smooth entrance animations and reactive styling based on stability (Color/Hue).

## Data Flow

```mermaid
graph TD
    Loop[Game Loop (rAF)] -->|dt| Store[Zustand Store]
    Store -->|step(dt)| System[SCM_System]
    System -->|update(dt)| Entity[SCM_Entity]
    Entity -->|read| Math[Math Lib]
    
    User[User Input] -->|Action| Store
    Store -->|Modify| System
    
    Canvas[SimulationCanvas] -.->|Read Ref| System
    ControlPanel[Control Panel] -.->|Subscribe| Store
```
