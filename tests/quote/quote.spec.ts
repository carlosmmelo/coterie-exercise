/**
 * Quote API end-to-end tests using Playwright's APIRequestContext.
 * Covers: valid flows, edge inputs, invalid inputs, and schema validation.
 */
import { test, expect } from '@playwright/test';
import { QuoteApi } from '../../src/api/quoteApi';
import { QuoteResponseSchema, validateSchema } from '../../src/utils/schemas';
import { validScenarios, invalidScenarios, edgeScenarios } from '../../src/data/quoteTestData';
import { attachRequestAndResponse } from '../../src/utils/reporting';

test.describe('Quote API', () => {
  test.describe('Valid requests', () => {
    for (const scenario of validScenarios) {
      test(`returns premium and quoteId for ${scenario.name}`, async ({ request, baseURL }, testInfo) => {
        const api = new QuoteApi(request, baseURL!);
        const res = await api.createQuote(scenario.payload);

        if (!res.ok) {
          await attachRequestAndResponse(testInfo, scenario.payload, res);
        }
        expect(res.ok, `Expected 2xx status, got ${res.status} with body: ${JSON.stringify(res.body)}`).toBeTruthy();

        const schemaResult = validateSchema(QuoteResponseSchema, res.body);
        if (!schemaResult.success) {
          await attachRequestAndResponse(testInfo, scenario.payload, res);
          expect(schemaResult.success, `Schema validation failed: ${schemaResult.errors.join('; ')}`).toBeTruthy();
        }
      });
    }
  });

  test.describe('Edge cases', () => {
    for (const scenario of edgeScenarios) {
      test(`handles ${scenario.name}`, async ({ request, baseURL }, testInfo) => {
        const api = new QuoteApi(request, baseURL!);
        const res = await api.createQuote(scenario.payload);

        // Some backends may accept zero revenue with premium 0; others may reject. Assert schema only if 2xx
        if (res.ok) {
          const schemaResult = validateSchema(QuoteResponseSchema, res.body);
          if (!schemaResult.success) {
            await attachRequestAndResponse(testInfo, scenario.payload, res);
            expect(schemaResult.success, `Schema validation failed: ${schemaResult.errors.join('; ')}`).toBeTruthy();
          }
        } else {
          if (res.status < 400) {
            await attachRequestAndResponse(testInfo, scenario.payload, res);
          }
          expect(res.status).toBeGreaterThanOrEqual(400);
        }
      });
    }
  });

  test.describe('Invalid/missing inputs', () => {
    for (const scenario of invalidScenarios) {
      test(`rejects ${scenario.name}`, async ({ request, baseURL }, testInfo) => {
        const api = new QuoteApi(request, baseURL!);
        const res = await api.createQuote(scenario.payload);

        if (res.ok) {
          await attachRequestAndResponse(testInfo, scenario.payload, res);
        }
        expect(res.ok, `Expected non-2xx for invalid input, got ${res.status}`).toBeFalsy();
        expect(res.status).toBeGreaterThanOrEqual(400);
      });
    }
  });

  test('Response schema validation: structure only', async ({ request, baseURL }, testInfo) => {
    const api = new QuoteApi(request, baseURL!);
    const res = await api.createQuote({ revenue: 50_000, state: 'CA', business: 'retail' });
    if (!res.ok) {
      await attachRequestAndResponse(testInfo, { revenue: 50_000, state: 'CA', business: 'retail' }, res);
    }
    expect(res.ok, `Expected 2xx status, got ${res.status}`).toBeTruthy();

    const result = validateSchema(QuoteResponseSchema, res.body);
    if (!result.success) {
      await attachRequestAndResponse(testInfo, { revenue: 50_000, state: 'CA', business: 'retail' }, res);
      expect(result.success, `Schema validation failed: ${result.errors.join('; ')}`).toBeTruthy();
    }

    // Validate presence and type, not exact numbers
    const body = result.success ? result.data : undefined;
    expect(typeof body!.premium).toBe('number');
    expect(typeof body!.quoteId).toBe('string');
  });
});


