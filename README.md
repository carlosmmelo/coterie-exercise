## Coterie Exercise - Playwright API Tests

### Overview
Playwright + TypeScript API testing framework that exercises `POST /quote` on the mock API.

Endpoint base URL (configurable): `https://coterie-exercise.free.mockoapp.net`.

### Structure
- `playwright.config.ts`: Global config, base URL, and headers
- `src/api/baseApi.ts`: Reusable API base for requests
- `src/api/quoteApi.ts`: `QuoteApi` wrapper for `/quote`
- `src/utils/schemas.ts`: Zod schemas and helper
- `src/data/quoteTestData.ts`: Structured test scenarios
- `tests/quote/quote.spec.ts`: Test suite (valid, invalid, edge, schema)

### File documentation
- `package.json`: Declares dependencies (`@playwright/test`, `typescript`, `zod`) and test scripts
- `tsconfig.json`: Strict TS configuration for test and source files
- `playwright.config.ts`: Sets `baseURL`, default headers, reporters, and timeouts
- `src/api/baseApi.ts`: Documents a small API client abstraction returning normalized envelopes
- `src/api/quoteApi.ts`: Documents operations specific to `/quote` and payload typing
- `src/utils/schemas.ts`: Documents response schema and helper validation function
- `src/data/quoteTestData.ts`: Documents scenario collections and intended usage
- `tests/quote/quote.spec.ts`: Documents coverage areas and expectations style

### Install & Run
1. Install dependencies:
```bash
npm i
```
2. Run tests:
```bash
npm test
```
3. Open HTML report:
```bash
npm run test:report
```

### Config
- Override API base URL:
```bash
API_BASE_URL=https://your-host npm test
```

### Notes on Strategy
- Reusability via `ApiBase` and `QuoteApi`
- Test data management through scenario arrays
- Schema validation with Zod verifies response structure, not specific values
- Coverage includes: valid cases, invalid/missing fields, edge inputs, and schema-only checks


