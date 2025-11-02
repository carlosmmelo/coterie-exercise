/**
 * Page Object Model for the Coverage Selection page.
 * Encapsulates all interactions and assertions for the coverage selection UI.
 */
import { BasePage } from './basePage';
import { Locator, expect, type Page } from '@playwright/test';
import { coverageLocators } from '../locators/coverageLocators';

export type CoverageOption = 'None' | 'Silver' | 'Gold' | 'Platinum';
export type StateCode = 'WI' | 'OH' | 'IL' | 'NV' | 'TX' | 'NY' | 'CA' | '';

export class CoverageSelectionPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

  /**
   * Navigates to the coverage selection page.
   */
  async navigate(): Promise<void> {
    await this.navigateTo('/app/public/index.html');
  }

  /**
   * Selects a state from the dropdown.
   * Accepts empty string to clear selection.
   */
  async selectState(state: StateCode): Promise<void> {
    // const select = this.page.stateSelect();
    // await select.waitFor({ state: 'visible' });
    // await select.selectOption(state || '');
    await this.page.locator(coverageLocators.stateSelect).selectOption(state || '');
  }

  /**
   * Gets the coverage map with all coverage options and their locators.
   */
  private getCoverageMap(): Record<CoverageOption, string> {
    return {
      None: coverageLocators.coverageNone,
      Silver: coverageLocators.coverageSilver,
      Gold: coverageLocators.coverageGold,
      Platinum: coverageLocators.coveragePlatinum
    };
  }

  /**
   * Gets the locator string for a given coverage option.
   */
  private getCoverageLocator(coverage: CoverageOption): string {
    return this.getCoverageMap()[coverage];
  }

  /**
   * Selects a coverage option by clicking the radio button.
   */
  async selectCoverage(coverage: CoverageOption): Promise<void> {
    const selector = this.getCoverageLocator(coverage);
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Asserts that the coverage section is visible.
   */
  async expectCoverageSectionVisible(): Promise<void> {
    const section = this.page.locator(coverageLocators.coverageSection);
    await expect(section).toBeVisible();
  }

  /**
   * Asserts that the coverage section is hidden.
   */
  async expectCoverageSectionHidden(): Promise<void> {
    const section = this.page.locator(coverageLocators.coverageSection);
    await expect(section).toBeHidden();
  }

  /**
   * Asserts that a specific coverage option is visible.
   */
  async expectCoverageOptionVisible(coverage: CoverageOption): Promise<void> {
    const selector = this.getCoverageLocator(coverage);
    const locator = this.page.locator(selector);
    await expect(locator).toBeVisible();
  }

  /**
   * Asserts that all four coverage options are visible.
   */
  async expectAllCoverageOptionsVisible(): Promise<void> {
    const options = Object.keys(this.getCoverageMap()) as CoverageOption[];
    for (const option of options) {
      await this.expectCoverageOptionVisible(option);
    }
  }

  /**
   * Asserts that a specific coverage option is selected.
   */
  async expectCoverageSelected(coverage: CoverageOption): Promise<void> {
    const selector = this.getCoverageLocator(coverage);
    const locator = this.page.locator(selector);
    await expect(locator).toBeChecked();
  }

  /**
   * Asserts that "None" is selected by default.
   */
  async expectNoneSelectedByDefault(): Promise<void> {
    await this.expectCoverageSelected('None');
  }

  /**
   * Gets the selected state value from the dropdown.
   */
  async getSelectedState(): Promise<string | null> {
    return await this.page.locator(coverageLocators.stateSelect).inputValue();
  }

  /**
   * Gets the selected coverage option value.
   */
  async getSelectedCoverage(): Promise<CoverageOption | null> {
    const selectedRadio = this.page.locator('input[name="coverage"]:checked');
    if (await selectedRadio.count() === 0) {
      return null;
    }
    const value = await selectedRadio.inputValue();
    return value as CoverageOption;
  }
}

