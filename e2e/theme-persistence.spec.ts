import { test, expect } from '@playwright/test'

test.describe('Theme Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('theme toggle button exists', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle')
    await expect(themeToggle).toBeVisible()
  })

  test('can toggle theme from light to dark', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle')
    
    const initialTheme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    await themeToggle.click()
    await page.waitForTimeout(300)
    
    const newTheme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    expect(newTheme).not.toBe(initialTheme)
  })

  test('theme persists in localStorage', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle')
    
    await themeToggle.click()
    await page.waitForTimeout(300)
    
    const storedTheme = await page.evaluate(() => 
      localStorage.getItem('theme')
    )
    
    expect(storedTheme).toBeTruthy()
    expect(['light', 'dark']).toContain(storedTheme || '')
  })

  test('theme persists across page reloads', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle')
    
    await themeToggle.click()
    await page.waitForTimeout(300)
    
    const themeAfterToggle = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    await page.reload()
    await page.waitForTimeout(500)
    
    const themeAfterReload = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    expect(themeAfterReload).toBe(themeAfterToggle)
  })

  test('theme persists across navigation', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle')
    
    await themeToggle.click()
    await page.waitForTimeout(300)
    
    const themeBeforeNav = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    await page.click('a[href="/about"]')
    await page.waitForURL('/about')
    await page.waitForTimeout(300)
    
    const themeAfterNav = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    expect(themeAfterNav).toBe(themeBeforeNav)
  })

  test('theme toggle is keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab')
    
    let attempts = 0
    let themeToggleFocused = false
    
    while (attempts < 20 && !themeToggleFocused) {
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement
        return el?.closest('.theme-toggle') !== null
      })
      
      if (focusedElement) {
        themeToggleFocused = true
        break
      }
      
      await page.keyboard.press('Tab')
      attempts++
    }
    
    expect(themeToggleFocused).toBe(true)
    
    const initialTheme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    await page.keyboard.press('Enter')
    await page.waitForTimeout(300)
    
    const newTheme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    expect(newTheme).not.toBe(initialTheme)
  })

  test('theme toggle has proper ARIA attributes', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle')
    
    const ariaLabel = await themeToggle.getAttribute('aria-label')
    expect(ariaLabel).toMatch(/switch to (light|dark) theme/i)
    
    const buttonType = await themeToggle.getAttribute('type')
    expect(buttonType).toBe('button')
  })

  test('multiple theme toggles work correctly', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle')
    
    const initialTheme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    await themeToggle.click()
    await page.waitForTimeout(300)
    
    await themeToggle.click()
    await page.waitForTimeout(300)
    
    const finalTheme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    expect(finalTheme).toBe(initialTheme)
  })

  test('respects prefers-color-scheme on first visit', async ({ page, context }) => {
    await context.clearCookies()
    await page.evaluate(() => localStorage.clear())
    
    await page.goto('/')
    
    const theme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-theme')
    )
    
    expect(['light', 'dark']).toContain(theme || '')
  })
})
