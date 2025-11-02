/**
 * Playwright configuration for API and UI tests.
 * - Sets `testDir`, reporter, timeouts
 * - Provides a `baseURL` that can be overridden with `API_BASE_URL` env var
 * - Applies default JSON header for API requests
 * - Serves static files for UI tests
 */
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [
    {
      name: 'api',
      testMatch: /.*\.spec\.ts$/,
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://coterie-exercise.free.mockoapp.net',
        extraHTTPHeaders: {
          'Content-Type': 'application/json'
        }
      }
    },
    {
      name: 'ui',
      testMatch: /.*\.spec\.ts$/,
      testDir: './tests/ui',
      use: {
        baseURL: 'http://localhost:3000'
      }
    }
  ],
  webServer: {
    command: 'npx http-server . -p 3000 -c-1',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  },
  timeout: 30_000,
  expect: {
    timeout: 5_000
  }
});


