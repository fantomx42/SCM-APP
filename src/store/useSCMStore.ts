import { create } from 'zustand';
import { SCM_System } from '@/lib/scm/System';
import { SCM_Entity } from '@/lib/scm/Entity';
import { SCMVariables } from '@/lib/scm/types';

interface SCMStore {
    system: SCM_System;
    isRunning: boolean;
    simulationSpeed: number; // Multiplier for dt

    // Actions
    addEntity: (label: string, vars: SCMVariables) => void;
    resetSimulation: () => void;
    toggleSimulation: () => void;
    setSimulationSpeed: (speed: number) => void;
    step: (dt: number) => void;

    // Field Controls
    setEnvironment: (val: number) => void;
    setNostalgia: (val: number) => void;
}

export const useSCMStore = create<SCMStore>((set, get) => ({
    system: new SCM_System(),
    isRunning: false,
    simulationSpeed: 1.0,

    addEntity: (label, vars) => {
        const { system } = get();
        // Random position for now
        const pos = {
            x: Math.random() * 800,
            y: Math.random() * 600
        };
        const entity = new SCM_Entity(
            crypto.randomUUID(),
            label,
            vars,
            pos
        );
        system.addEntity(entity);
        // Trigger re-render by creating new system ref? 
        // Ideally we just mutate system and rely on transient updates for canvas, 
        // but for UI we might need to clone. For now, we keep same instance.
        set({ system });
    },

    resetSimulation: () => {
        const { system } = get();
        system.reset();
        set({ system, isRunning: false });
    },

    toggleSimulation: () => set((state) => ({ isRunning: !state.isRunning })),

    setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),

    step: (dt) => {
        const { system, simulationSpeed } = get();
        system.step(dt * simulationSpeed);
        // We don't call set({ system }) here to avoid React render loop on every frame.
        // The canvas will read from system ref directly.
        // UI components that need reactive updates might need a subscription or polling.
    },

    setEnvironment: (val) => {
        const { system } = get();
        system.field.environment = val;
        set({ system });
    },

    setNostalgia: (val) => {
        const { system } = get();
        system.field.nostalgia = val;
        set({ system });
    }
}));
