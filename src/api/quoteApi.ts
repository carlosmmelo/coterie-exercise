/**
 * Quote API wrapper exposing typed operations for `/quote`.
 * Keeps test code simple and focused on intent.
 */
import { ApiBase, ApiResponseEnvelope } from './baseApi';

export interface QuoteRequest {
  revenue: number;
  state: string;
  business: string;
}

export interface QuoteResponse {
  premium: number;
  quoteId: string;
}

export class QuoteApi extends ApiBase {
  /**
   * Creates a quote using the provided payload.
   * Accepts `Partial<QuoteRequest>` to facilitate invalid/missing field tests.
   */
  async createQuote(payload: Partial<QuoteRequest>): Promise<ApiResponseEnvelope<unknown>> {
    return this.send<unknown>({
      method: 'POST',
      path: '/quote',
      data: payload
    });
  }
}


