/**
 * Lightweight reusable API base client built on Playwright's APIRequestContext.
 * Encapsulates URL building, JSON serialization, and response shaping.
 */
import { APIRequestContext, APIResponse } from '@playwright/test';

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  data?: unknown;
  headers?: Record<string, string>;
}

export interface ApiResponseEnvelope<T = unknown> {
  status: number;
  ok: boolean;
  body: T | unknown;
  raw: APIResponse;
}

export class ApiBase {
  protected readonly baseUrl: string;
  protected readonly request: APIRequestContext;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.request = request;
  }

  /**
   * Sends an HTTP request and returns a normalized envelope with status, ok, body, and raw response.
   * - JSON-serializes the `data` for non-GET/DELETE methods
   * - Attempts JSON parse; falls back to text
   */
  async send<T = unknown>(options: ApiRequestOptions): Promise<ApiResponseEnvelope<T>> {
    const url = `${this.baseUrl}${options.path.startsWith('/') ? '' : '/'}${options.path}`;
    const method = options.method ?? 'GET';
    const payload = method === 'GET' || method === 'DELETE' ? undefined : (options.data ?? {});
    const response = await this.request.fetch(url, {
      method,
      // Let Playwright serialize the JSON using `data` to preserve types
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {})
      }
    });

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    return {
      status: response.status(),
      ok: response.ok(),
      body: body as T,
      raw: response
    };
  }
}


