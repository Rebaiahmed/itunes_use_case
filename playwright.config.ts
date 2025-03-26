import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    browserName: 'chromium',
    baseURL: 'http://localhost:4200',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});