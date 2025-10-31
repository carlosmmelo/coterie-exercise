/**
 * Playwright configuration for API tests.
 * - Sets `testDir`, reporter, timeouts
 * - Provides a `baseURL` that can be overridden with `API_BASE_URL` env var
 * - Applies default JSON header for API requests
 */
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // API base URL; can be overridden by env var API_BASE_URL
    baseURL: process.env.API_BASE_URL || 'https://coterie-exercise.free.mockoapp.net',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  },
  timeout: 30_000,
  expect: {
    timeout: 5_000
  }
});


