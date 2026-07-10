import { test, expect } from '@playwright/test';

test.describe('Kanban Board MVP', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the board and initial columns', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Kanban Board MVP');
    
    // Check if initial columns are present
    const columns = page.locator('.column-container');
    await expect(columns).toHaveCount(5);
    
    // Check specific column titles
    await expect(columns.nth(0).locator('h3')).toHaveText('To Do');
    await expect(columns.nth(1).locator('h3')).toHaveText('In Progress');
  });

  test('should allow renaming a column', async ({ page }) => {
    const firstColumnTitle = page.locator('.title-group').first();
    
    // Click to edit
    await firstColumnTitle.click();
    
    const input = page.locator('.rename-input').first();
    await input.fill('Backlog');
    await input.press('Enter');
    
    await expect(firstColumnTitle.locator('h3')).toHaveText('Backlog');
  });

  test('should allow adding a new card', async ({ page }) => {
    const firstColumn = page.locator('.column-container').first();
    
    // Click add card button
    await firstColumn.locator('.add-btn').click();
    
    // Fill out form
    await firstColumn.locator('.add-card-input').fill('New Test Task');
    await firstColumn.locator('.add-card-textarea').fill('This is a test detail');
    await firstColumn.locator('.btn-primary').click();
    
    // Verify card is added
    const newCard = firstColumn.locator('.card').last();
    await expect(newCard.locator('h4')).toHaveText('New Test Task');
    await expect(newCard.locator('.card-details')).toHaveText('This is a test detail');
  });

  test('should allow deleting a card', async ({ page }) => {
    const firstColumn = page.locator('.column-container').first();
    const initialCards = await firstColumn.locator('.card').count();
    
    // Delete the first card in the first column
    await firstColumn.locator('.delete-btn').first().click();
    
    // Verify count decreased
    await expect(firstColumn.locator('.card')).toHaveCount(initialCards - 1);
  });
});
