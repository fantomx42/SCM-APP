/**
 * Symbolic Collapse Model v3.1 - Type Definitions
 */

export interface SCMVariables {
    T: number; // Tonic Stability [0, 1]
    E: number; // Entropy Pressure [0, 1]
    S: number; // Structural Cohesion [0, 1]
    I: number; // Interpretive Integrity [0, 1]
    P: number; // Projective Load [0, 1]
}

export interface DerivedMetrics {
    SCM: number; // Final Stability Score [0, 1]
    R_SN: number; // Signal-to-Noise Ratio
    isCollapsed: boolean;
}

export interface SymbolicEntity {
    id: string;
    label: string;
    vars: SCMVariables;
    baseVars: SCMVariables; // Baseline values for drift
    metrics: DerivedMetrics;

    // Position for visualization (force-directed graph)
    position: { x: number; y: number };
    velocity: { x: number; y: number };
}

export interface GlobalFieldState {
    time: number;
    dt: number;

    // Field Modifiers
    environment: number; // E_f [0, 1]
    nostalgia: number;   // NW [0, 1]
    noiseFloor: {        // Sigma weights for noise
        sigmaE: number;
        sigmaP: number;
    };

    // Constants (can be tweaked in UI)
    decayRates: SCMVariables;
    weights: {
        wT: number; wS: number; wI: number;
        wE: number; wP: number;
    };
    interactions: {
        etaTS: number; etaSI: number; etaTI: number; etaEP: number;
    };
}

export const DEFAULT_CONSTANTS = {
    decayRates: { T: 0.1, E: 0.1, S: 0.1, I: 0.1, P: 0.1 },
    weights: { wT: 1, wS: 1, wI: 1, wE: 1, wP: 1 },
    interactions: { etaTS: 0.2, etaSI: 0.2, etaTI: 0.2, etaEP: 0.2 },
    noiseFloor: { sigmaE: 0.5, sigmaP: 0.5 },
};
