import React, { useState } from 'react';
import { useSCMStore } from '@/store/useSCMStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';

export const ControlPanel: React.FC = () => {
    const {
        isRunning,
        toggleSimulation,
        resetSimulation,
        addEntity,
        setEnvironment,
        setNostalgia,
        system
    } = useSCMStore();

    const [newLabel, setNewLabel] = useState('Symbol');
    const [newVars, setNewVars] = useState({ T: 0.8, E: 0.1, S: 0.8, I: 0.8, P: 0.1 });

    const handleAdd = () => {
        addEntity(newLabel, newVars);
        setNewLabel(`Symbol ${system.entities.length + 2}`);
    };

    return (
        <div className="w-80 h-full bg-slate-900 border-l border-slate-800 p-4 flex flex-col gap-4 overflow-y-auto text-slate-200">
            <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-100">Simulation Control</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Button
                        variant={isRunning ? "destructive" : "default"}
                        size="sm"
                        onClick={toggleSimulation}
                        className="flex-1"
                    >
                        {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {isRunning ? "Pause" : "Run"}
                    </Button>
                    <Button variant="secondary" size="sm" onClick={resetSimulation}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-100">Global Fields</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs text-slate-400">Environment (Ef): {system.field.environment.toFixed(2)}</label>
                        <Slider
                            value={[system.field.environment]}
                            max={1} step={0.01}
                            onValueChange={([v]) => setEnvironment(v)}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-slate-400">Nostalgia (NW): {system.field.nostalgia.toFixed(2)}</label>
                        <Slider
                            value={[system.field.nostalgia]}
                            max={1} step={0.01}
                            onValueChange={([v]) => setNostalgia(v)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-100">Entity Creator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        className="bg-slate-900 border-slate-700"
                        placeholder="Label"
                    />

                    {Object.entries(newVars).map(([key, val]) => (
                        <div key={key} className="space-y-1">
                            <div className="flex justify-between">
                                <label className="text-xs text-slate-400">{key}</label>
                                <span className="text-xs text-slate-500">{val.toFixed(2)}</span>
                            </div>
                            <Slider
                                value={[val]}
                                max={1} step={0.05}
                                onValueChange={([v]) => setNewVars(prev => ({ ...prev, [key]: v }))}
                            />
                        </div>
                    ))}

                    <Button className="w-full" onClick={handleAdd}>
                        <Plus className="w-4 h-4 mr-2" /> Add Entity
                    </Button>
                </CardContent>
            </Card>

            <div className="mt-auto text-[10px] text-slate-600 text-center">
                SCM v3.1 Engine
            </div>
        </div>
    );
};
