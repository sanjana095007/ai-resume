import { test, expect } from '@playwright/test'

test.describe('Routing', () => {
  test('loads the homepage', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/V Chaitanya Chowdari/)
    await expect(page.locator('h1')).toContainText('V Chaitanya Chowdari')
  })

  test('navigates to about section', async ({ page }) => {
    await page.goto('/')
    
    await page.click('a[href="/about"]')
    await expect(page).toHaveURL('/about')
  })

  test('navigates to experience section', async ({ page }) => {
    await page.goto('/')
    
    await page.click('a[href="/experience"]')
    await expect(page).toHaveURL('/experience')
  })

  test('navigates to projects section', async ({ page }) => {
    await page.goto('/')
    
    await page.click('a[href="/projects"]')
    await expect(page).toHaveURL('/projects')
  })

  test('navigates to contact section', async ({ page }) => {
    await page.goto('/')
    
    await page.click('a[href="/contact"]')
    await expect(page).toHaveURL('/contact')
  })

  test('hero link navigates to home', async ({ page }) => {
    await page.goto('/about')
    
    await page.click('a[href="/"]')
    await expect(page).toHaveURL('/')
  })

  test('handles invalid routes by redirecting to home', async ({ page }) => {
    await page.goto('/non-existent-route')
    await expect(page).toHaveURL('/')
  })

  test('navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/')
    
    await page.keyboard.press('Tab')
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement || '')
  })

  test('maintains navigation state across route changes', async ({ page }) => {
    await page.goto('/')
    
    await page.click('a[href="/about"]')
    await page.waitForURL('/about')
    
    const activeLink = page.locator('.section-nav__link--active')
    await expect(activeLink).toBeVisible()
  })

  test('back button works correctly', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/about"]')
    await page.waitForURL('/about')
    
    await page.goBack()
    await expect(page).toHaveURL('/')
  })

  test('forward button works correctly', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/about"]')
    await page.waitForURL('/about')
    
    await page.goBack()
    await page.goForward()
    await expect(page).toHaveURL('/about')
  })

  test('all navigation links are present', async ({ page }) => {
    await page.goto('/')
    
    const navLinks = page.locator('.section-nav__link')
    const count = await navLinks.count()
    
    expect(count).toBeGreaterThan(0)
  })
})
