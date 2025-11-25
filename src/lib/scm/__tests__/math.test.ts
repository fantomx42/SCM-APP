
import { calculateSCM } from '../math';
import { SCMVariables, GlobalFieldState, DEFAULT_CONSTANTS } from '../types';

describe('calculateSCM', () => {
  it('should return 0.5 for balanced stabilizers and destabilizers', () => {
    const vars: SCMVariables = { T: 1, S: 1, I: 1, E: 1, P: 1 };
    const field: GlobalFieldState = {
      ...DEFAULT_CONSTANTS,
      time: 0,
      dt: 0.1,
      environment: 1,
      nostalgia: 0,
      weights: { wT: 0.5, wS: 0.5, wI: 0.5, wE: 0.5, wP: 0.5 },
      interactions: { etaTS: 0, etaSI: 0, etaTI: 0, etaEP: 0 },
    };
    const scm = calculateSCM(vars, field);
    expect(scm).toBe(0.5);
  });
});
