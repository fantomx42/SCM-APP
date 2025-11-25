import { SymbolEntity, SCMResult } from '@/types/scm';

/**
 * SCM Symbol Extractor
 * 
 * Extracts "symbols" (concepts, entities) from text.
 * Assigns initial stability scores to symbols based on the current SCM environment.
 */
export class SymbolExtractor {

    extract(text: string, scmState: SCMResult): SymbolEntity[] {
        // Mock extraction logic using simple heuristics/regex
        const words = text.split(/\s+/);
        const symbols: SymbolEntity[] = [];

        // Simple heuristic: Capitalized words are entities
        const potentialEntities = words.filter(w => /^[A-Z]/.test(w) && w.length > 2);

        // Deduplicate
        const uniqueEntities = Array.from(new Set(potentialEntities));

        uniqueEntities.forEach((entityText, index) => {
            // Determine stability based on environment
            let baseStability = 50; // Neutral

            if (scmState.isStable) {
                baseStability += 20; // Environment supports stability
            } else {
                baseStability -= 10; // Chaotic environment reduces initial stability
            }

            // Random variance for simulation
            const variance = Math.floor(Math.random() * 20) - 10;

            symbols.push({
                id: `sym_${Date.now()}_${index}`,
                text: entityText.replace(/[^a-zA-Z0-9]/g, ''), // Clean
                type: 'concept',
                stability: Math.max(0, Math.min(100, baseStability + variance)),
                frequency: 1
            });
        });

        return symbols;
    }
}
