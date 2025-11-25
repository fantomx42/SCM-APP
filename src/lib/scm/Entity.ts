import { SymbolicEntity, SCMVariables, GlobalFieldState, DerivedMetrics } from './types';
import { calculateSCM, calculateSignalToNoise, calculateDerivatives } from './math';

export class SCM_Entity implements SymbolicEntity {
    id: string;
    label: string;
    vars: SCMVariables;
    baseVars: SCMVariables;
    metrics: DerivedMetrics;
    position: { x: number; y: number };
    velocity: { x: number; y: number };

    constructor(
        id: string,
        label: string,
        initialVars: SCMVariables,
        position: { x: number; y: number } = { x: 0, y: 0 }
    ) {
        this.id = id;
        this.label = label;
        this.vars = { ...initialVars };
        this.baseVars = { ...initialVars }; // Default baseline to initial
        this.position = position;
        this.velocity = { x: 0, y: 0 };

        // Initial metrics
        this.metrics = {
            SCM: 0,
            R_SN: 0,
            isCollapsed: false,
        };
    }

    update(dt: number, field: GlobalFieldState) {
        if (this.metrics.isCollapsed) return;

        // 1. Calculate Derivatives
        const dVars = calculateDerivatives(this.vars, this.baseVars, field);

        // 2. Euler Integration
        this.vars.T += dVars.T * dt;
        this.vars.E += dVars.E * dt;
        this.vars.S += dVars.S * dt;
        this.vars.I += dVars.I * dt;
        this.vars.P += dVars.P * dt;

        // 3. Apply Environment Field (E_f)
        this.vars.T *= field.environment;
        this.vars.S *= field.environment;

        // 4. Apply Nostalgia (NW)
        // S' = S + alpha * NW * (1 - S)
        const alphaNW = 0.1; // Hardcoded for now
        this.vars.S += alphaNW * field.nostalgia * (1 - this.vars.S) * dt;

        // 5. Clamp Variables [0, 1]
        this.clampVariables();

        // 6. Update Metrics
        this.metrics.SCM = calculateSCM(this.vars, field);
        this.metrics.R_SN = calculateSignalToNoise(this.vars, field);

        // 7. Check Collapse
        // Threshold could be configurable
        if (this.metrics.R_SN < 0.2) {
            this.metrics.isCollapsed = true;
        }
    }

    private clampVariables() {
        const clamp = (v: number) => Math.max(0, Math.min(1, v));
        this.vars.T = clamp(this.vars.T);
        this.vars.E = clamp(this.vars.E);
        this.vars.S = clamp(this.vars.S);
        this.vars.I = clamp(this.vars.I);
        this.vars.P = clamp(this.vars.P);
    }
}
