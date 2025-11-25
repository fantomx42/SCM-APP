import React from 'react';
import { motion } from 'framer-motion';
import { SCM_Entity } from '@/lib/scm/Entity';

interface SymbolNodeProps {
    entity: SCM_Entity;
}

export const SymbolNode: React.FC<SymbolNodeProps> = ({ entity }) => {
    const { position, metrics, label } = entity;

    // Color based on Stability (Green -> Red)
    // or maybe Blue (Stable) -> Orange (Unstable) -> Gray (Collapsed)
    const getBackgroundColor = () => {
        if (metrics.isCollapsed) return '#6b7280'; // Gray
        // Interpolate hue from 0 (Red/Unstable) to 120 (Green/Stable)
        // SCM is [0, 1]
        const hue = metrics.SCM * 120;
        return `hsl(${hue}, 70%, 50%)`;
    };

    return (
        <motion.div
            className="absolute flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-white shadow-lg cursor-pointer backdrop-blur-sm"
            style={{
                backgroundColor: getBackgroundColor(),
                x: position.x,
                y: position.y,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1, x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className="text-xs font-bold text-white text-center px-2">
                {label}
            </div>
            <div className="text-[10px] text-white/80">
                SCM: {metrics.SCM.toFixed(2)}
            </div>
            {metrics.isCollapsed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <span className="text-xs text-red-500 font-bold">COLLAPSED</span>
                </div>
            )}
        </motion.div>
    );
};
