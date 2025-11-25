import { useEffect, useRef } from 'react';
import { useSCMStore } from '@/store/useSCMStore';

export function useGameLoop() {
    const { isRunning, step } = useSCMStore();
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();

    useEffect(() => {
        const animate = (time: number) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = (time - previousTimeRef.current) / 1000; // Convert to seconds
                const cappedDt = Math.min(deltaTime, 0.1);
                step(cappedDt);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            previousTimeRef.current = undefined;
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isRunning, step]);
}
