import { test, expect } from '@playwright/test';

test('should display album list with correct content', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.waitForSelector('app-album-item');
  await expect(page.locator('app-album-item').first()).toBeVisible();
  await expect(page.url()).toBe('http://localhost:4200/albums');
  const albumTitles = await page.locator('.card-title').allTextContents();
  expect(albumTitles.length).toBeGreaterThan(0);
  const artistNames = await page.locator('.card-subtitle').allTextContents();
  expect(artistNames.length).toBeGreaterThan(0);
});