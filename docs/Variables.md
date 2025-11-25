# SCM v3.1 Variable Definitions

## Core Variables

Each symbolic entity is defined by a 5-dimensional state vector $\bm{v} \in [0,1]^5$.

### $T$: Tonic Stability

* **Definition**: The internal resistance of a symbol to drift or mutation.
* **High $T$**: The symbol is "solid," unchanging, and foundational (e.g., "Mother", "Sun").
* **Low $T$**: The symbol is fluid, ephemeral, or easily redefined (e.g., a meme format, a slang term).
* **Role**: Primary stabilizer.

### $E$: Entropy Pressure

* **Definition**: The degree of disorder or noise acting upon the symbol. Can be internal (incoherence) or external (hostile environment).
* **High $E$**: The symbol is under attack, confusing, or dissolving.
* **Low $E$**: The symbol is clear and distinct.
* **Role**: Primary destabilizer.

### $S$: Structural Cohesion

* **Definition**: The strength of the internal relationships that hold the symbol's components together.
* **High $S$**: The symbol is logically sound and internally consistent.
* **Low $S$**: The symbol is contradictory or fragmented.
* **Role**: Stabilizer, heavily influenced by Nostalgia ($NW$).

### $I$: Interpretive Integrity

* **Definition**: The fidelity of the symbol's meaning across different contexts or observers.
* **High $I$**: The symbol means the same thing to everyone (Universal).
* **Low $I$**: The symbol is ambiguous or controversial (Subjective).
* **Role**: Stabilizer, heavily influenced by Emotional Resonance ($ERF$).

### $P$: Projective Load

* **Definition**: The cognitive or emotional burden the symbol imposes on the observer.
* **High $P$**: The symbol is "heavy," demanding, or traumatic.
* **Low $P$**: The symbol is "light," easy to process, or background.
* **Role**: Destabilizer (consumes energy).

---

## Derived Metrics

### SCM Stability Score

The master metric for symbolic health.
$$SCM = \mathcal{S} - \mathcal{D} + \mathcal{X}$$

* **Range**: $[0, 1]$
* **Interpretation**:
  * $1.0$: Perfect, eternal symbol.
  * $0.0$: Total collapse.

### $R_{SN}$: Signal-to-Noise Ratio

$$R_{SN} = \frac{T + S + I}{T + S + I + \sigma_E E + \sigma_P P}$$

* **Threshold**: If $R_{SN} < \theta_{collapse}$ (typically 0.2), the symbol collapses.

### $F_c$: Fusion Coefficient

Measures the potential for two symbols to merge into a new, stable composite.
$$F_c = Comp_{\text{adj}} \cdot \frac{SCM_A + SCM_B}{2}$$
