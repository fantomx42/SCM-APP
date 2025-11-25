import { NextResponse } from 'next/server';
import { SCMEngine } from '@/lib/engine';
import { SCMInput, SCMInferenceConfig } from '@/types/scm';

const engine = new SCMEngine();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        const input: SCMInput = {
            baseStability: Number(body.baseStability),
            collapsePressure: Number(body.collapsePressure),
            modifierBlock: Number(body.modifierBlock),
            dampingBlock: Number(body.dampingBlock),
            fusionCoefficient: Number(body.fusionCoefficient),
            confidenceMetric: Number(body.confidenceMetric),
        };

        const inferenceConfig: SCMInferenceConfig | undefined = body.inferenceConfig ? {
            modelId: String(body.inferenceConfig.modelId || 'default'),
            temperature: Number(body.inferenceConfig.temperature || 0.7),
            maxTokens: Number(body.inferenceConfig.maxTokens || 100),
            scmAware: Boolean(body.inferenceConfig.scmAware),
        } : undefined;

        if (isNaN(input.baseStability) || isNaN(input.collapsePressure)) {
            return NextResponse.json(
                { error: 'Invalid input parameters' },
                { status: 400 }
            );
        }

        const result = await engine.process(input, inferenceConfig);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error processing SCM request:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
