import { SCM_Entity } from './Entity';
import { GlobalFieldState, DEFAULT_CONSTANTS, SCMVariables } from './types';
import { calculateCompatibility, calculateFusionCoefficient } from './math';

export class SCM_System {
    entities: SCM_Entity[];
    field: GlobalFieldState;

    constructor() {
        this.entities = [];
        this.field = {
            time: 0,
            dt: 0.1,
            environment: 1.0,
            nostalgia: 0.0,
            noiseFloor: DEFAULT_CONSTANTS.noiseFloor,
            decayRates: DEFAULT_CONSTANTS.decayRates,
            weights: DEFAULT_CONSTANTS.weights,
            interactions: DEFAULT_CONSTANTS.interactions,
        };
    }

    addEntity(entity: SCM_Entity) {
        this.entities.push(entity);
    }

    removeEntity(id: string) {
        this.entities = this.entities.filter(e => e.id !== id);
    }

    step(dt: number) {
        this.field.time += dt;
        this.field.dt = dt;

        // 1. Update individual entities
        this.entities.forEach(entity => entity.update(dt, this.field));

        // 2. Check for Fusion Events
        // Simple O(N^2) check for now, can optimize later
        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                const A = this.entities[i];
                const B = this.entities[j];

                if (A.metrics.isCollapsed || B.metrics.isCollapsed) continue;

                // Calculate Compatibility
                const comp = calculateCompatibility(A.vars, B.vars, this.field);

                // Calculate Fusion Coefficient
                const Fc = calculateFusionCoefficient(comp, A.metrics.SCM, B.metrics.SCM);

                // If Fusion is viable (Threshold > 0.8 for example)
                if (Fc > 0.8) {
                    // Trigger Fusion Event (Placeholder for now)
                    // In a full sim, this might merge them or spawn a child
                    // console.log(`Fusion potential between ${A.label} and ${B.label}: ${Fc}`);
                }
            }
        }
    }

    // Helper to reset system
    reset() {
        this.entities = [];
        this.field.time = 0;
    }
}
