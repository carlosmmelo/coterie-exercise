/**
 * Test data for UI E2E tests.
 * Centralizes test scenarios and state configurations.
 */
import { StateCode, CoverageOption } from '../ui/pages/coverageSelectionPage';

export const V2_STATES: StateCode[] = ['WI', 'OH', 'IL', 'NV'];
export const V1_STATES: StateCode[] = ['TX', 'NY', 'CA'];
export const ALL_STATES: StateCode[] = [...V2_STATES, ...V1_STATES];

export const COVERAGE_OPTIONS: CoverageOption[] = ['None', 'Silver', 'Gold', 'Platinum'];

export interface UiTestScenario {
  name: string;
  state: StateCode;
  expectedCoverageVisible: boolean;
  defaultCoverage?: CoverageOption;
  testCoverage?: CoverageOption[];
}

/**
 * Test scenarios for V2 customers (should see coverage options)
 */
export const v2CustomerScenarios: UiTestScenario[] = V2_STATES.map(state => ({
  name: `V2 customer in ${state}`,
  state,
  expectedCoverageVisible: true,
  defaultCoverage: 'None',
  testCoverage: COVERAGE_OPTIONS
}));

/**
 * Test scenarios for V1 customers (should NOT see coverage options)
 */
export const v1CustomerScenarios: UiTestScenario[] = V1_STATES.map(state => ({
  name: `V1 customer in ${state}`,
  state,
  expectedCoverageVisible: false
}));

/**
 * Edge case scenarios
 */
export const edgeCaseScenarios: Partial<UiTestScenario>[] = [
  {
    name: 'No state selected initially',
    expectedCoverageVisible: false
  },
  {
    name: 'Switch from V2 to V1 state',
    state: 'WI' as StateCode,
    expectedCoverageVisible: true
  }
];

