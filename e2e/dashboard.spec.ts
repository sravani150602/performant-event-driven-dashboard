import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => { await page.goto('/'); });
test('streams normalized events and filters severity', async ({ page }) => {
  await page.getByRole('button', { name: 'Start event stream' }).click();
  await expect(page.getByText('120', { exact: true }).first()).toBeVisible();
  await page.getByLabel('Severity').selectOption('critical');
  await expect(page.locator('.pill--critical').first()).toBeVisible();
});
test('has no automatically detectable WCAG A/AA violations', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations).toEqual([]);
});
test('matches the reviewed desktop dashboard snapshot', async ({ page }) => {
  await expect(page).toHaveScreenshot('dashboard-empty.png', { fullPage: true, animations: 'disabled' });
});
