import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@test/test-utils'
import userEvent from '@testing-library/user-event'
import ContactForm from '../ContactForm'

vi.mock('@utils/emailService', () => ({
  sendEmail: vi.fn(),
}))

vi.mock('@utils/analytics', () => ({
  trackFormSubmission: vi.fn(),
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders contact form with all fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('has proper ARIA label for form', () => {
    render(<ContactForm />)
    
    const form = screen.getByRole('form', { name: /contact form/i })
    expect(form).toBeInTheDocument()
  })

  it('shows validation error for empty name field', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    await user.click(nameInput)
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for short message', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const messageInput = screen.getByLabelText(/message/i)
    await user.type(messageInput, 'short')
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    const { sendEmail } = await import('@utils/emailService')
    const { trackFormSubmission } = await import('@utils/analytics')
    vi.mocked(sendEmail).mockResolvedValue({ 
      success: true, 
      message: 'Message sent successfully!' 
    })
    
    const user = userEvent.setup()
    render(<ContactForm />)
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough characters')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(sendEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with enough characters',
      })
    })
    
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully!/i)).toBeInTheDocument()
    })
    
    expect(trackFormSubmission).toHaveBeenCalledWith('contact_form', true)
  })

  it('shows error message on submission failure', async () => {
    const { sendEmail } = await import('@utils/emailService')
    const { trackFormSubmission } = await import('@utils/analytics')
    vi.mocked(sendEmail).mockResolvedValue({ 
      success: false, 
      message: 'Failed to send message' 
    })
    
    const user = userEvent.setup()
    render(<ContactForm />)
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument()
    })
    
    expect(trackFormSubmission).toHaveBeenCalledWith('contact_form', false)
  })

  it('disables form fields while submitting', async () => {
    const { sendEmail } = await import('@utils/emailService')
    vi.mocked(sendEmail).mockImplementation(() => new Promise(() => {}))
    
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByRole('textbox', { name: /message/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(nameInput).toBeDisabled()
      expect(emailInput).toBeDisabled()
      expect(messageInput).toBeDisabled()
      expect(submitButton).toBeDisabled()
      expect(screen.getByText(/sending.../i)).toBeInTheDocument()
    })
  })

  it('marks required fields with aria-required', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/message/i)).toHaveAttribute('aria-required', 'true')
  })

  it('sets aria-invalid on fields with errors', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    await user.click(nameInput)
    await user.tab()
    
    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('links error messages to fields with aria-describedby', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    await user.click(nameInput)
    await user.tab()
    
    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-describedby', 'name-error')
      expect(screen.getByText(/name must be at least 2 characters/i)).toHaveAttribute('id', 'name-error')
    })
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-form'
    const { container } = render(<ContactForm className={customClass} />)
    
    const form = container.querySelector(`.${customClass}`)
    expect(form).toBeInTheDocument()
  })

  it('resets form after successful submission', async () => {
    const { sendEmail } = await import('@utils/emailService')
    vi.mocked(sendEmail).mockResolvedValue({ 
      success: true, 
      message: 'Message sent successfully!' 
    })
    
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })
  })
})
