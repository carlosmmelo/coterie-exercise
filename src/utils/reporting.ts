/**
 * Helpers to attach diagnostic JSON to Playwright's HTML report.
 */
import type { TestInfo } from '@playwright/test';
import type { ApiResponseEnvelope } from '../api/baseApi';

export async function attachJson(info: TestInfo, name: string, data: unknown): Promise<void> {
  await info.attach(name, {
    contentType: 'application/json',
    body: JSON.stringify(data, null, 2)
  });
}

export async function attachRequestAndResponse(
  info: TestInfo,
  requestPayload: unknown,
  response: ApiResponseEnvelope<unknown>
): Promise<void> {
  await attachJson(info, 'request.json', requestPayload);
  await attachJson(info, 'response.json', {
    status: response.status,
    ok: response.ok,
    body: response.body
  });
}


