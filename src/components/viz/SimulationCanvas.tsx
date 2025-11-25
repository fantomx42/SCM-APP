import React, { useRef } from 'react';
import { useSCMStore } from '@/store/useSCMStore';
import { useGameLoop } from '@/hooks/useGameLoop';
import { SymbolNode } from './SymbolNode';

export const SimulationCanvas: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { system } = useSCMStore();

    // Start the loop
    useGameLoop();

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-slate-900 overflow-hidden"
        >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Entities */}
            {system.entities.map(entity => (
                <SymbolNode key={entity.id} entity={entity} />
            ))}

            {/* Debug Info Overlay */}
            <div className="absolute bottom-4 right-4 text-white/50 text-xs font-mono pointer-events-none">
                Time: {system.field.time.toFixed(2)}s <br />
                Entities: {system.entities.length}
            </div>
        </div>
    );
};
