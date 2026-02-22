import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@test/test-utils'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '../ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('theme-toggle')
  })

  it('displays current theme label', () => {
    render(<ThemeToggle />)
    
    const label = screen.getByText(/light|dark/i)
    expect(label).toBeInTheDocument()
  })

  it('has proper ARIA label for accessibility', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label')
    expect(button.getAttribute('aria-label')).toMatch(/switch to (light|dark) theme/i)
  })

  it('toggles theme when clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    const initialLabel = button.getAttribute('aria-label')
    
    await user.click(button)
    
    await waitFor(() => {
      const newLabel = button.getAttribute('aria-label')
      expect(newLabel).not.toBe(initialLabel)
    })
  })

  it('updates aria-label after toggle', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    const initialLabel = button.getAttribute('aria-label')
    
    await user.click(button)
    
    await waitFor(() => {
      const newLabel = button.getAttribute('aria-label')
      expect(newLabel).not.toBe(initialLabel)
      expect(newLabel).toMatch(/switch to (light|dark) theme/i)
    })
  })

  it('persists theme preference in localStorage', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    await waitFor(() => {
      expect(localStorage.getItem('resume-theme')).toBeTruthy()
    })
    
    const initialTheme = localStorage.getItem('resume-theme')
    await user.click(button)
    
    await waitFor(() => {
      const newTheme = localStorage.getItem('resume-theme')
      expect(newTheme).toBeTruthy()
      expect(newTheme).not.toBe(initialTheme)
      expect(['light', 'dark']).toContain(newTheme)
    })
  })

  it('is keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    await user.tab()
    expect(button).toHaveFocus()
    
    const initialAriaLabel = button.getAttribute('aria-label')
    await user.keyboard('{Enter}')
    
    await waitFor(() => {
      const newAriaLabel = button.getAttribute('aria-label')
      expect(newAriaLabel).not.toBe(initialAriaLabel)
    })
  })

  it('can be toggled with spacebar', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    await user.tab()
    
    const initialAriaLabel = button.getAttribute('aria-label')
    await user.keyboard(' ')
    
    await waitFor(() => {
      const newAriaLabel = button.getAttribute('aria-label')
      expect(newAriaLabel).not.toBe(initialAriaLabel)
    })
  })

  it('renders theme icons', () => {
    const { container } = render(<ThemeToggle />)
    
    const icon = container.querySelector('.theme-toggle__icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders theme track and thumb', () => {
    const { container } = render(<ThemeToggle />)
    
    const track = container.querySelector('.theme-toggle__track')
    const thumb = container.querySelector('.theme-toggle__thumb')
    
    expect(track).toBeInTheDocument()
    expect(thumb).toBeInTheDocument()
  })

  it('has button type attribute', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('multiple toggles work correctly', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    const initialLabel = button.getAttribute('aria-label')
    
    await user.click(button)
    await waitFor(() => {
      expect(button.getAttribute('aria-label')).not.toBe(initialLabel)
    })
    
    await user.click(button)
    await waitFor(() => {
      expect(button.getAttribute('aria-label')).toBe(initialLabel)
    })
  })
})
