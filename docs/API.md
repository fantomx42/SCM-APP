# SCM Engine API Reference

## `SCM_System`

The main controller for the simulation.

### Properties

* `entities: SCM_Entity[]` - List of all active symbols.
* `field: GlobalFieldState` - Current state of global modifiers.

### Methods

* `step(dt: number): void`
  * Advances the simulation by `dt` seconds.
  * Updates all entities and checks for fusion events.
* `addEntity(entity: SCM_Entity): void`
  * Registers a new symbol.
* `reset(): void`
  * Clears all entities and resets time to 0.

---

## `SCM_Entity`

A single symbolic node.

### Constructor

```ts
new SCM_Entity(
  id: string,
  label: string,
  initialVars: SCMVariables,
  position: { x: number, y: number }
)
```

### Properties

* `vars: SCMVariables` - Current state ($T, E, S, I, P$).
* `metrics: DerivedMetrics` - Calculated stability ($SCM, R_{SN}$).
* `position: { x, y }` - 2D coordinates.

### Methods

* `update(dt: number, field: GlobalFieldState): void`
  * Calculates derivatives $\frac{d\bm{v}}{dt}$.
  * Applies Euler integration.
  * Updates metrics.
  * Checks for collapse condition.

---

## Types

### `SCMVariables`

```ts
interface SCMVariables {
  T: number; // Tonic Stability
  E: number; // Entropy Pressure
  S: number; // Structural Cohesion
  I: number; // Interpretive Integrity
  P: number; // Projective Load
}
```
