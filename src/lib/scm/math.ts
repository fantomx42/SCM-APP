import { SCMVariables, GlobalFieldState, DerivedMetrics } from './types';

/**
 * Core SCM Stability Score Calculation
 * SCM = S - D + X
 */
export function calculateSCM(
    vars: SCMVariables,
    field: GlobalFieldState
): number {
    const { T, E, S, I, P } = vars;
    const { wT, wS, wI, wE, wP } = field.weights;
    const { etaTS, etaSI, etaTI, etaEP } = field.interactions;

    // Stabilizers
    const stabilizer = wT * T + wS * S + wI * I;

    // Destabilizers
    const destabilizer = wE * E + wP * P;

    // Interaction Terms
    const interaction =
        etaTS * (T * S) +
        etaSI * (S * I) +
        etaTI * (T * I) -
        etaEP * (E * P);

    const rawScore = stabilizer - destabilizer + interaction;

    // Bounded [0, 1]
    return Math.max(0, Math.min(1, rawScore));
}

/**
 * Signal-to-Noise Ratio
 * R_SN = Sig / (Sig + N)
 */
export function calculateSignalToNoise(
    vars: SCMVariables,
    field: GlobalFieldState
): number {
    const { T, S, I, E, P } = vars;
    const { sigmaE, sigmaP } = field.noiseFloor;

    const signal = T + S + I;
    const noise = sigmaE * E + sigmaP * P;

    if (signal + noise === 0) return 0;
    return signal / (signal + noise);
}

/**
 * Differential Equations for Time Evolution
 * Returns dX/dt for each variable
 */
export function calculateDerivatives(
    vars: SCMVariables,
    baseVars: SCMVariables,
    field: GlobalFieldState
): SCMVariables {
    const { T, E, S, I, P } = vars;
    const { decayRates } = field;

    // Coefficients (Hardcoded for now based on spec, could be config)
    const k = {
        ST: 0.1, IT: 0.1, ET: 0.1, PT: 0.1,
        TS: 0.1, IS: 0.1, ES: 0.1,
        TI: 0.1, SI: 0.1, EI: 0.1,
        TE: 0.1, SE: 0.1,
        TP: 0.1
    };

    // dT/dt
    const dT = -decayRates.T * (T - baseVars.T) + k.ST * S + k.IT * I - k.ET * E - k.PT * P;

    // dS/dt
    const dS = -decayRates.S * (S - baseVars.S) + k.TS * T + k.IS * I - k.ES * E;

    // dI/dt
    const dI = -decayRates.I * (I - baseVars.I) + k.TI * T + k.SI * S - k.EI * E;

    // dE/dt (assuming xi_E is 0 for internal evolution, handled by external field injection)
    const dE = -decayRates.E * (E - baseVars.E) - k.TE * T - k.SE * S;

    // dP/dt
    const dP = -decayRates.P * (P - baseVars.P) - k.TP * T;

    return { T: dT, E: dE, S: dS, I: dI, P: dP };
}

/**
 * Compatibility between two entities
 * Comp = 1 - d / sqrt(5)
 */
export function calculateCompatibility(
    vA: SCMVariables,
    vB: SCMVariables,
    field: GlobalFieldState
): number {
    const d2 =
        Math.pow(vA.T - vB.T, 2) +
        Math.pow(vA.E - vB.E, 2) +
        Math.pow(vA.S - vB.S, 2) +
        Math.pow(vA.I - vB.I, 2) +
        Math.pow(vA.P - vB.P, 2);

    const d = Math.sqrt(d2);
    const rawComp = 1 - d / Math.sqrt(5);

    // Modulated by Environment
    return rawComp * field.environment;
}

/**
 * Fusion Coefficient
 * Fc = Comp * (SCM_A + SCM_B) / 2
 */
export function calculateFusionCoefficient(
    comp: number,
    scmA: number,
    scmB: number
): number {
    return comp * ((scmA + scmB) / 2);
}
