/**
 * E2E tests for Coverage Selection UI (Story 2).
 * Tests coverage option visibility and selection behavior for V1 and V2 customers.
 */
import { test, expect } from '@playwright/test';
import { CoverageSelectionPage } from '../../../src/ui/pages/coverageSelectionPage';
import { V2_STATES, V1_STATES, COVERAGE_OPTIONS } from '../../../src/data/uiTestData';

test.describe('Coverage Selection - Story 2', () => {
  let coveragePage: CoverageSelectionPage;

  test.beforeEach(async ({ page }) => {
    coveragePage = new CoverageSelectionPage(page);
    await coveragePage.navigate();
  });

  test.describe('V2 Customer Coverage Options', () => {
    for (const state of V2_STATES) {
      test(`V2 customer in ${state} sees all four coverage options`, async () => {
        await coveragePage.selectState(state);
        await coveragePage.expectCoverageSectionVisible();
        await coveragePage.expectAllCoverageOptionsVisible();

        // Verify each option is present and clickable
        for (const option of COVERAGE_OPTIONS) {
          await coveragePage.expectCoverageOptionVisible(option);
        }
      });

      test(`Default selection is "None" for V2 customer in ${state}`, async () => {
        await coveragePage.selectState(state);
        await coveragePage.expectCoverageSectionVisible();
        await coveragePage.expectNoneSelectedByDefault();
      });
    }

    test('V2 customer can select different coverage options', async () => {
      const testState = V2_STATES[0];
      await coveragePage.selectState(testState);
      await coveragePage.expectCoverageSectionVisible();

      // Test selecting each coverage option
      const optionsToTest: Array<'Silver' | 'Gold' | 'Platinum'> = ['Silver', 'Gold', 'Platinum'];
      
      for (const option of optionsToTest) {
        await coveragePage.selectCoverage(option);
        await coveragePage.expectCoverageSelected(option);
        
        // Verify the selected option is checked
        const selectedCoverage = await coveragePage.getSelectedCoverage();
        expect(selectedCoverage).toBe(option);
      }

      // Verify "None" can be selected back
      await coveragePage.selectCoverage('None');
      await coveragePage.expectCoverageSelected('None');
    });
  });

  test.describe('V1 Customer Coverage Options', () => {
    for (const state of V1_STATES) {
      test(`V1 customer in ${state} does not see new coverage options`, async () => {
        await coveragePage.selectState(state);
        await coveragePage.expectCoverageSectionHidden();
      });
    }
  });

  test.describe('Edge Cases', () => {
    test('Coverage section is hidden when no state is selected initially', async () => {
      // Page loads with no state selected
      await coveragePage.expectCoverageSectionHidden();
    });

    test('Switching from V2 to V1 state hides coverage options', async () => {
      const v2State = V2_STATES[0];
      const v1State = V1_STATES[0];

      // Select V2 state - coverage should be visible
      await coveragePage.selectState(v2State);
      await coveragePage.expectCoverageSectionVisible();
      await coveragePage.expectAllCoverageOptionsVisible();

      // Switch to V1 state - coverage should be hidden
      await coveragePage.selectState(v1State);
      await coveragePage.expectCoverageSectionHidden();
    });

    test('Switching from V1 to V2 state shows coverage options with None selected', async () => {
      const v1State = V1_STATES[0];
      const v2State = V2_STATES[0];

      // Select V1 state - coverage should be hidden
      await coveragePage.selectState(v1State);
      await coveragePage.expectCoverageSectionHidden();

      // Switch to V2 state - coverage should be visible with None selected
      await coveragePage.selectState(v2State);
      await coveragePage.expectCoverageSectionVisible();
      await coveragePage.expectNoneSelectedByDefault();
    });

    test('Selecting a different V2 state maintains coverage selection', async () => {
      const firstV2State = V2_STATES[0];
      const secondV2State = V2_STATES[1];

      // Select first V2 state and choose Silver
      await coveragePage.selectState(firstV2State);
      await coveragePage.expectCoverageSectionVisible();
      await coveragePage.selectCoverage('Silver');
      await coveragePage.expectCoverageSelected('Silver');

      // Switch to another V2 state - should reset to None (default)
      await coveragePage.selectState(secondV2State);
      await coveragePage.expectCoverageSectionVisible();
      await coveragePage.expectNoneSelectedByDefault();
    });
  });
});

