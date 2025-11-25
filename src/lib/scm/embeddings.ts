import { EmbeddingVector, EmbeddingConfig, SCMResult } from '@/types/scm';

/**
 * SCM Embedding Normalizer
 * 
 * Normalizes embedding vectors based on SCM state.
 * - "SCM-Weighted" normalization adjusts vector magnitude based on Stability.
 */
export class EmbeddingNormalizer {
    private config: EmbeddingConfig;

    constructor(config: EmbeddingConfig) {
        this.config = config;
    }

    normalize(vector: EmbeddingVector, scmState: SCMResult): EmbeddingVector {
        if (this.config.normalizationStrategy === 'scm-weighted') {
            return this.scmWeightedNormalization(vector, scmState);
        }
        return this.l2Normalize(vector);
    }

    private l2Normalize(vector: number[]): number[] {
        const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
        if (norm === 0) return vector;
        return vector.map(val => val / norm);
    }

    private scmWeightedNormalization(vector: number[], scmState: SCMResult): number[] {
        // Base L2 normalization
        const normalized = this.l2Normalize(vector);

        // Apply SCM weight
        // If stable, vectors are "sharper" (higher magnitude? or just scaled?)
        // Let's assume we scale the vector to represent "intensity" of the symbol in this state.

        let scaleFactor = 1.0;

        if (scmState.isStable) {
            scaleFactor = 1.2; // Stronger signal
        } else if (scmState.evolutionState === 'collapsing') {
            scaleFactor = 0.5; // Weak signal due to collapse
        } else if (scmState.evolutionState === 'fusing') {
            scaleFactor = 1.5; // High intensity during fusion
        }

        return normalized.map(val => val * scaleFactor);
    }
}
