/**
 * Centralized test data for quote scenarios.
 * Keeps tests readable and enables simple extension of coverage.
 */
export type ValidScenario = {
  name: string;
  payload: { revenue: number; state: string; business: string };
};

export type InvalidScenario = {
  name: string;
  payload: Record<string, unknown>;
};

/** Assorted valid business/state/revenue combinations */
export const validScenarios: ValidScenario[] = [
  {
    name: 'typical retail in CA',
    payload: { revenue: 50_000, state: 'CA', business: 'retail' }
  },
  {
    name: 'professional services in NY',
    payload: { revenue: 125_000, state: 'NY', business: 'professional' }
  },
  {
    name: 'manufacturing in TX',
    payload: { revenue: 750_000, state: 'TX', business: 'manufacturing' }
  }
];

/** Edge boundaries for revenue scale */
export const edgeScenarios: ValidScenario[] = [
  {
    name: 'zero revenue',
    payload: { revenue: 0, state: 'OH', business: 'retail' }
  },
  {
    name: 'very large revenue',
    payload: { revenue: 10_000_000, state: 'FL', business: 'technology' }
  }
];

/** Inputs intended to trigger validation errors */
export const invalidScenarios: InvalidScenario[] = [
  {
    name: 'missing revenue',
    payload: { state: 'CA', business: 'retail' }
  },
  {
    name: 'missing state',
    payload: { revenue: 50_000, business: 'retail' }
  },
  {
    name: 'missing business',
    payload: { revenue: 50_000, state: 'CA' }
  },
  {
    name: 'negative revenue',
    payload: { revenue: -100, state: 'CA', business: 'retail' }
  },
  {
    name: 'invalid state code',
    payload: { revenue: 50_000, state: 'INVALID', business: 'retail' }
  }
];


