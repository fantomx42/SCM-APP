'use client';

import { useState } from 'react';

export default function ControlPanel() {
    const [active, setActive] = useState(false);
    const [stability, setStability] = useState(85);
    const [pressure, setPressure] = useState(45);

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-zinc-200">Control Panel</h3>
                <button
                    onClick={() => setActive(!active)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${active
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                >
                    {active ? 'SYSTEM ACTIVE' : 'STANDBY'}
                </button>
            </div>

            <div className="space-y-6">
                {/* Stability Control */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Base Stability</span>
                        <span className="text-zinc-200 font-mono">{stability}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={stability}
                        onChange={(e) => setStability(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                {/* Pressure Control */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Collapse Pressure</span>
                        <span className="text-zinc-200 font-mono">{pressure}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={pressure}
                        onChange={(e) => setPressure(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors border border-zinc-700">
                        Reset Parameters
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium transition-colors border border-rose-500/20">
                        Emergency Stop
                    </button>
                </div>
            </div>
        </div>
    );
}
