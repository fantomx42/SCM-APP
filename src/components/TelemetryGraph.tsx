'use client';

import { useEffect, useState } from 'react';

type DataPoint = {
    value: number;
    timestamp: number;
};

export default function TelemetryGraph({
    label,
    color = 'indigo',
    height = 100
}: {
    label: string;
    color?: 'indigo' | 'emerald' | 'purple' | 'rose';
    height?: number;
}) {
    const [data, setData] = useState<DataPoint[]>([]);

    // Generate initial data
    useEffect(() => {
        const initialData = Array.from({ length: 20 }, (_, i) => ({
            value: 50 + Math.random() * 30 - 15,
            timestamp: Date.now() - (20 - i) * 1000,
        }));
        setData(initialData);

        const interval = setInterval(() => {
            setData((prev) => {
                const lastValue = prev[prev.length - 1].value;
                const newValue = Math.max(0, Math.min(100, lastValue + (Math.random() * 20 - 10)));
                return [...prev.slice(1), { value: newValue, timestamp: Date.now() }];
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getColor = (c: string) => {
        switch (c) {
            case 'emerald': return '#10b981';
            case 'purple': return '#a855f7';
            case 'rose': return '#f43f5e';
            default: return '#6366f1';
        }
    };

    const strokeColor = getColor(color);

    // Calculate path
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - d.value;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</span>
                <span className="text-lg font-mono font-semibold text-zinc-200">
                    {data.length > 0 ? data[data.length - 1].value.toFixed(1) : '--'}
                </span>
            </div>
            <div className="relative w-full overflow-hidden rounded-lg bg-zinc-950/50 border border-zinc-800/50" style={{ height }}>
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                >
                    <path
                        d={`M 0,100 L 0,${100 - (data[0]?.value || 0)} ${points} L 100,100 Z`}
                        fill={strokeColor}
                        fillOpacity="0.1"
                    />
                    <polyline
                        points={points}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>
        </div>
    );
}
