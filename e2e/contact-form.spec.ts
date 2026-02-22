import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('contact form is visible', async ({ page }) => {
    const form = page.locator('.contact-form')
    await expect(form).toBeVisible()
  })

  test('all form fields are present', async ({ page }) => {
    await expect(page.locator('input[id="name"]')).toBeVisible()
    await expect(page.locator('input[id="email"]')).toBeVisible()
    await expect(page.locator('textarea[id="message"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible()
  })

  test('shows validation error for empty name', async ({ page }) => {
    const nameInput = page.locator('input[id="name"]')
    
    await nameInput.click()
    await page.keyboard.press('Tab')
    
    await expect(page.locator('text=/name must be at least 2 characters/i')).toBeVisible({
      timeout: 2000,
    })
  })

  test('shows validation error for invalid email', async ({ page }) => {
    const emailInput = page.locator('input[id="email"]')
    
    await emailInput.fill('invalid-email')
    await page.keyboard.press('Tab')
    
    await expect(page.locator('text=/please enter a valid email address/i')).toBeVisible({
      timeout: 2000,
    })
  })

  test('shows validation error for short message', async ({ page }) => {
    const messageInput = page.locator('textarea[id="message"]')
    
    await messageInput.fill('short')
    await page.keyboard.press('Tab')
    
    await expect(page.locator('text=/message must be at least 10 characters/i')).toBeVisible({
      timeout: 2000,
    })
  })

  test('submits form with valid data (mocked)', async ({ page }) => {
    await page.route('**/api/contact', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      })
    })

    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('textarea[id="message"]').fill('This is a test message with enough characters')
    
    await page.click('button[type="submit"]')
  })

  test('form fields have proper labels', async ({ page }) => {
    await expect(page.locator('label[for="name"]')).toContainText(/name/i)
    await expect(page.locator('label[for="email"]')).toContainText(/email/i)
    await expect(page.locator('label[for="message"]')).toContainText(/message/i)
  })

  test('required fields are marked', async ({ page }) => {
    const nameLabel = page.locator('label[for="name"]')
    const emailLabel = page.locator('label[for="email"]')
    const messageLabel = page.locator('label[for="message"]')
    
    await expect(nameLabel.locator('.contact-form__required')).toBeVisible()
    await expect(emailLabel.locator('.contact-form__required')).toBeVisible()
    await expect(messageLabel.locator('.contact-form__required')).toBeVisible()
  })

  test('form is keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab')
    
    let attempts = 0
    let nameFieldFocused = false
    
    while (attempts < 30 && !nameFieldFocused) {
      const focusedId = await page.evaluate(() => document.activeElement?.id)
      
      if (focusedId === 'name') {
        nameFieldFocused = true
        break
      }
      
      await page.keyboard.press('Tab')
      attempts++
    }
    
    expect(nameFieldFocused).toBe(true)
    
    await page.keyboard.type('John Doe')
    await page.keyboard.press('Tab')
    
    await page.keyboard.type('john@example.com')
    await page.keyboard.press('Tab')
    
    await page.keyboard.type('This is a test message that is long enough to pass validation')
    
    const nameValue = await page.locator('input[id="name"]').inputValue()
    const emailValue = await page.locator('input[id="email"]').inputValue()
    const messageValue = await page.locator('textarea[id="message"]').inputValue()
    
    expect(nameValue).toBe('John Doe')
    expect(emailValue).toBe('john@example.com')
    expect(messageValue).toContain('test message')
  })

  test('form fields have proper ARIA attributes', async ({ page }) => {
    const nameInput = page.locator('input[id="name"]')
    const emailInput = page.locator('input[id="email"]')
    const messageInput = page.locator('textarea[id="message"]')
    
    await expect(nameInput).toHaveAttribute('aria-required', 'true')
    await expect(emailInput).toHaveAttribute('aria-required', 'true')
    await expect(messageInput).toHaveAttribute('aria-required', 'true')
  })

  test('error messages have proper role', async ({ page }) => {
    const nameInput = page.locator('input[id="name"]')
    
    await nameInput.click()
    await page.keyboard.press('Tab')
    
    const errorMessage = page.locator('#name-error')
    await expect(errorMessage).toHaveAttribute('role', 'alert')
  })

  test('form can be filled and cleared', async ({ page }) => {
    await page.locator('input[id="name"]').fill('John Doe')
    await page.locator('input[id="email"]').fill('john@example.com')
    await page.locator('textarea[id="message"]').fill('Test message')
    
    await page.locator('input[id="name"]').clear()
    await page.locator('input[id="email"]').clear()
    await page.locator('textarea[id="message"]').clear()
    
    await expect(page.locator('input[id="name"]')).toHaveValue('')
    await expect(page.locator('input[id="email"]')).toHaveValue('')
    await expect(page.locator('textarea[id="message"]')).toHaveValue('')
  })

  test('textarea allows multi-line input', async ({ page }) => {
    const messageInput = page.locator('textarea[id="message"]')
    
    await messageInput.fill('Line 1\nLine 2\nLine 3')
    
    const value = await messageInput.inputValue()
    expect(value).toContain('\n')
  })

  test('form has proper novalidate attribute', async ({ page }) => {
    const form = page.locator('.contact-form')
    await expect(form).toHaveAttribute('novalidate')
  })
})
