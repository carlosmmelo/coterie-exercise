## Coterie Exercise - Playwright API & UI Tests

### Overview
Playwright + TypeScript testing framework that includes:
- **API Tests**: Exercises `POST /quote` on the mock API
- **UI Tests**: E2E tests for the Coverage Selection frontend (Story 2)

**API Endpoint base URL (configurable)**: `https://coterie-exercise.free.mockoapp.net`

> **Note**: The API is mocked using [Mocko.dev](https://app.mocko.dev/mocks) service for API testing purposes.

### API Endpoint Behavior

The `POST /quote` endpoint accepts a JSON payload with the following structure:

```json
{
  "revenue": number,
  "state": string,
  "business": string
}
```

#### Supported States & Premium Rates

**V1 States** (Premium = Revenue × 0.025):
- `CA` (California)
- `NY` (New York)
- `TX` (Texas)

**V2 States** (Premium = Revenue × 0.015):
- `WI` (Wisconsin)
- `OH` (Ohio)
- `IL` (Illinois)
- `NV` (Nevada)

#### Validation Rules

- **Revenue**: Must be greater than 0, not empty, and numeric type
- **Business**: Must be a string (empty string allowed)
- **State**: Must be one of the supported states listed above

#### Response Format

**Success Response (200)**:
```json
{
  "premium": number,
  "quoteId": "Q-xxxxx"
}
```

**Error Response (400)**:
- `"Revenue must be greater than 0, not empty and numeric type."` - Invalid revenue
- `"Business must be a string (empty string allowed)."` - Invalid business type
- `"Not a valid customer state."` - Unsupported state code

### Project Structure

#### API Testing Components
- `playwright.config.ts`: Configuration with separate projects for API and UI tests
- `src/api/baseApi.ts`: Reusable API base class for HTTP requests
- `src/api/quoteApi.ts`: `QuoteApi` wrapper for `/quote` endpoint
- `src/utils/schemas.ts`: Zod schemas and validation helpers
- `src/utils/reporting.ts`: Test reporting utilities
- `src/data/quoteTestData.ts`: Structured API test scenarios
- `tests/api/quote/quote.spec.ts`: API test suite (valid, invalid, edge, schema)

#### UI Testing Components
- `src/ui/pages/basePage.ts`: Base page class for UI tests
- `src/ui/pages/coverageSelectionPage.ts`: Page Object Model for coverage selection page
- `src/ui/locators/coverageLocators.ts`: Centralized UI selectors for the coverage page
- `src/data/uiTestData.ts`: UI test data and scenarios
- `tests/ui/coverage/coverage.spec.ts`: UI E2E test suite for the coverage page
- `app/public/index.html`: Frontend application for Story 2

#### Configuration Files
- `package.json`: Declares dependencies (`@playwright/test`, `typescript`, `zod`) and test scripts
- `tsconfig.json`: Strict TypeScript configuration for test and source files
- `playwright.config.ts`: Sets base URLs, headers, reporters, timeouts, and web server configuration

### Installation Guide

1. **Install Node.js dependencies:**
```bash
npm install
```

2. **Install Playwright browsers:**
```bash
npx playwright install
```

   This will download Chromium, Firefox, and WebKit browsers required for UI tests.

   **Note**: If you only need specific browsers, you can install them individually:
   ```bash
   npx playwright install chromium  # For Chromium only
   npx playwright install firefox  # For Firefox only
   npx playwright install webkit  # For WebKit only
   ```

### Running Tests

#### Run All Tests
```bash
npm test
```
Runs both API and UI test suites.

#### Run Specific Test Projects

**Run only API tests:**
```bash
npm test -- --project=api
```

**Run only UI tests:**
```bash
npm test -- --project=ui
```

#### Run Tests in UI Mode
```bash
npm run test:ui
```
Opens Playwright's interactive UI mode where you can run, debug, and watch tests.

#### Run a Specific Test File
```bash
# Run API tests
npm test -- tests/api/quote/quote.spec.ts

# Run UI tests
npm test -- tests/ui/coverage/coverage.spec.ts
```

#### Run Tests in Debug Mode
```bash
npm test -- --debug
```

### Test Reports

#### View HTML Report
After running tests, generate and open the HTML report:
```bash
npm run test:report
```

The HTML report includes:
- Test execution timeline
- Screenshots and videos (for UI tests)
- Test results and failures
- Detailed error messages

Reports are saved in the `playwright-report/` directory.

### Configuration

#### Override API Base URL
```bash
API_BASE_URL=https://your-host npm test
```

#### Run Tests on Specific Browsers
```bash
# Run UI tests on Chromium only
npm test -- --project=ui --project=chromium

# Run UI tests on Firefox
npm test -- --project=ui --project=firefox
```

#### Run Tests in Headed Mode
```bash
npm test -- --project=ui --headed
```

### Test Coverage

#### API Tests
- Valid request scenarios (various states and business types)
- Invalid/missing input validation
- Edge cases (zero revenue, negative values, very large numbers)
- Response schema validation using Zod

#### UI Tests (Story 2 Requirements)
- V2 customers see all four coverage options (Silver, Gold, Platinum, None)
- V1 customers do not see coverage options
- Default selection is "None" for V2 customers
- Users can select different coverage options
- Edge cases (state switching, initial state)

### Testing Strategy

#### API Testing
- Reusability via `ApiBase` and `QuoteApi` classes
- Test data management through centralized scenario arrays
- Schema validation with Zod verifies response structure
- Coverage includes: valid cases, invalid/missing fields, edge inputs, and schema validation

#### UI Testing
- **Page Object Model (POM)**: Encapsulates page interactions in reusable classes
- **Selector Strategy**: Prioritizes ID selectors for reliability
- **Test Data Management**: Centralized test data in `uiTestData.ts`
- **Base Classes**: Reusable `BasePage` class for common functionality
- **Proper Waits**: Uses `waitFor()` before interactions for stability
- **DRY Principle**: Avoids code duplication with helper methods

### Type Checking
Run TypeScript type checking without executing tests:
```bash
npm run typecheck
```


