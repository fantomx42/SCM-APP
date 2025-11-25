import { SCMResult } from '@/types/scm';

/**
 * SCM Fusion Predictor
 * 
 * Predicts the likelihood and outcome of "Symbolic Fusion" events.
 * Fusion occurs when two stable symbols combine to form a new, higher-order symbol.
 */
export class FusionPredictor {

    /**
     * Predicts if fusion is likely between two entities given the current environment.
     */
    predictFusion(entityAStability: number, entityBStability: number, environmentState: SCMResult): {
        likelihood: number;
        predictedStability: number;
        isRecommended: boolean;
    } {
        // Fusion requires high energy (or specific environmental pressure)
        // If environment is "fusing", likelihood increases.

        let baseLikelihood = 0.0;

        // 1. Environmental Factor
        if (environmentState.evolutionState === 'fusing') {
            baseLikelihood += 0.4;
        } else if (environmentState.evolutionState === 'evolving') {
            baseLikelihood += 0.2;
        } else if (environmentState.evolutionState === 'collapsing') {
            baseLikelihood -= 0.2; // Hard to fuse when things are falling apart
        }

        // 2. Compatibility Factor (Mocked based on stability similarity)
        // Similar stability levels might fuse easier? Or opposites?
        // Let's assume similar stability helps.
        const stabilityDiff = Math.abs(entityAStability - entityBStability);
        if (stabilityDiff < 10) {
            baseLikelihood += 0.3;
        } else if (stabilityDiff > 50) {
            baseLikelihood -= 0.1;
        }

        // 3. Individual Readiness
        if (entityAStability > 60 && entityBStability > 60) {
            baseLikelihood += 0.2; // Both are mature symbols
        }

        const likelihood = Math.max(0, Math.min(1, baseLikelihood));

        // Predicted Stability of the new fused symbol
        // Usually higher than the sum/avg if successful (synergy)
        const predictedStability = (entityAStability + entityBStability) / 2 + (likelihood * 20);

        return {
            likelihood,
            predictedStability,
            isRecommended: likelihood > 0.6
        };
    }
}
