import { SCMExpert, SCMRoutingDecision, SCMResult } from '@/types/scm';

/**
 * SCM MoE Router
 * 
 * Routes queries to specific "Experts" based on the SCM Stability Index.
 * - Stable state -> Analytical/Stabilizer experts
 * - Unstable/Evolving state -> Creative/Catalyst experts
 */
export class SCMRouter {
    private experts: SCMExpert[];

    constructor() {
        // Initialize with some default experts
        this.experts = [
            { id: 'exp_stab_01', name: 'Stabilizer Alpha', specialization: 'stabilizer', activationThreshold: -100 }, // Always available if needed
            { id: 'exp_ana_01', name: 'Analytical Beta', specialization: 'analytical', activationThreshold: 0 }, // Needs positive stability
            { id: 'exp_cre_01', name: 'Creative Gamma', specialization: 'creative', activationThreshold: 20 }, // Needs high stability to be safe? Or maybe low stability triggers creativity? 
            // Let's assume Creative experts are needed when Evolving (high stability) OR when trying to break out of stagnation.
            // For this logic: Creative triggers on High Stability (Evolving)
            { id: 'exp_cat_01', name: 'Catalyst Delta', specialization: 'catalyst', activationThreshold: -50 } // Triggers when things are very bad (collapsing) to try and save it
        ];
    }

    route(input: string, scmState: SCMResult): SCMRoutingDecision {
        const selectedExperts: string[] = [];
        let reasoning = '';

        // Routing Logic based on SCM State
        if (scmState.evolutionState === 'collapsing') {
            // Emergency routing
            const catalyst = this.experts.find(e => e.specialization === 'catalyst');
            if (catalyst) {
                selectedExperts.push(catalyst.id);
                reasoning = 'System collapsing. Deploying Catalyst expert to intervene.';
            }
        } else if (scmState.evolutionState === 'stable') {
            // Standard operation
            const analytical = this.experts.find(e => e.specialization === 'analytical');
            if (analytical) {
                selectedExperts.push(analytical.id);
                reasoning = 'System stable. Using Analytical expert for precision.';
            }
        } else if (scmState.evolutionState === 'evolving' || scmState.evolutionState === 'fusing') {
            // High energy states
            const creative = this.experts.find(e => e.specialization === 'creative');
            if (creative) {
                selectedExperts.push(creative.id);
                reasoning = 'System evolving/fusing. Using Creative expert to maximize potential.';
            }
        } else {
            // Fallback
            const stabilizer = this.experts.find(e => e.specialization === 'stabilizer');
            if (stabilizer) {
                selectedExperts.push(stabilizer.id);
                reasoning = 'State undefined/neutral. Using Stabilizer.';
            }
        }

        return {
            selectedExperts,
            reasoning,
            routingScore: 0.95 // Mock routing confidence
        };
    }

    getExperts(): SCMExpert[] {
        return this.experts;
    }
}
