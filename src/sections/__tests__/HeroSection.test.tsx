import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@test/test-utils'
import userEvent from '@testing-library/user-event'
import HeroSection from '../HeroSection'
import { profile } from '@data/profile'

vi.mock('@utils/analytics', () => ({
  trackDownload: vi.fn(),
}))

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders hero section with correct heading', () => {
    render(<HeroSection />)
    
    const heading = screen.getByRole('heading', { name: profile.name, level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('displays profile information correctly', () => {
    render(<HeroSection />)
    
    expect(screen.getByText(profile.name)).toBeInTheDocument()
    expect(screen.getByText(profile.title)).toBeInTheDocument()
    expect(screen.getByText(profile.description)).toBeInTheDocument()
    expect(screen.getByText('AI Generalist & Builder')).toBeInTheDocument()
  })

  it('renders profile image with correct alt text', () => {
    render(<HeroSection />)
    
    const image = screen.getByAltText(profile.imageAlt)
    expect(image).toBeInTheDocument()
  })

  it('renders download PDF button with correct link', () => {
    render(<HeroSection />)
    
    const downloadButton = screen.getByRole('link', { name: /download pdf/i })
    expect(downloadButton).toBeInTheDocument()
    expect(downloadButton).toHaveAttribute('href', profile.cta.href)
  })

  it('renders contact button with email link', () => {
    render(<HeroSection />)
    
    const contactButton = screen.getByRole('link', { name: /let's connect/i })
    expect(contactButton).toBeInTheDocument()
    expect(contactButton).toHaveAttribute('href', `mailto:${profile.email}`)
  })

  it('renders all social media links', () => {
    render(<HeroSection />)
    
    const socialLinks = screen.getAllByRole('link')
    const githubLink = socialLinks.find(link => link.getAttribute('href') === profile.social.github)
    const twitterLink = socialLinks.find(link => link.getAttribute('href') === profile.social.twitter)
    const linkedinLink = socialLinks.find(link => link.getAttribute('href') === profile.social.linkedin)
    const portfolioLink = socialLinks.find(link => link.getAttribute('href') === profile.social.portfolio)
    
    expect(githubLink).toBeInTheDocument()
    expect(twitterLink).toBeInTheDocument()
    expect(linkedinLink).toBeInTheDocument()
    expect(portfolioLink).toBeInTheDocument()
  })

  it('has proper ARIA labels for accessibility', () => {
    render(<HeroSection />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading')
  })

  it('social links open in new tab', () => {
    render(<HeroSection />)
    
    const socialLinks = screen.getAllByRole('link')
    const githubLink = socialLinks.find(link => link.getAttribute('href') === profile.social.github)
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noreferrer noopener')
  })

  it('download button tracks analytics on click', async () => {
    const { trackDownload } = await import('@utils/analytics')
    const user = userEvent.setup()
    
    render(<HeroSection />)
    
    const downloadButton = screen.getByRole('link', { name: /download pdf/i })
    await user.click(downloadButton)
    
    expect(trackDownload).toHaveBeenCalledWith('V_Chaitanya_Chowdari_Resume.pdf')
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-hero'
    render(<HeroSection className={customClass} />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass(customClass)
  })
})
