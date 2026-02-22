import { describe, it, expect } from 'vitest'
import { render, screen } from '@test/test-utils'
import userEvent from '@testing-library/user-event'
import SectionNav from '../SectionNav'
import type { SectionNavItem } from '@data/navigation'

const mockNavItems: SectionNavItem[] = [
  { id: 'hero', label: 'Hero', icon: 'user' },
  { id: 'about', label: 'About', icon: 'info' },
  { id: 'experience', label: 'Experience', icon: 'suitcase' },
  { id: 'projects', label: 'Projects', icon: 'code' },
  { id: 'contact', label: 'Contact', icon: 'email' },
]

describe('SectionNav', () => {
  it('renders navigation with proper ARIA label', () => {
    render(<SectionNav items={mockNavItems} />)
    
    const nav = screen.getByRole('navigation', { name: /resume sections/i })
    expect(nav).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<SectionNav items={mockNavItems} />)
    
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(mockNavItems.length)
    
    mockNavItems.forEach((item) => {
      const link = links.find(l => l.textContent?.includes(item.label))
      expect(link).toBeTruthy()
    })
  })

  it('renders correct links for navigation items', () => {
    render(<SectionNav items={mockNavItems} />)
    
    const links = screen.getAllByRole('link')
    const heroLink = links.find(l => l.textContent?.includes('Hero'))
    const aboutLink = links.find(l => l.textContent?.includes('About'))
    const experienceLink = links.find(l => l.textContent?.includes('Experience'))
    
    expect(heroLink).toHaveAttribute('href', '/')
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(experienceLink).toHaveAttribute('href', '/experience')
  })

  it('applies active class to specified active item', () => {
    render(<SectionNav items={mockNavItems} activeId="about" />)
    
    const links = screen.getAllByRole('link')
    const aboutLink = links.find(l => l.textContent?.includes('About'))
    expect(aboutLink).toHaveClass('section-nav__link--active')
  })

  it('renders navigation items in a list', () => {
    render(<SectionNav items={mockNavItems} />)
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list).toHaveClass('section-nav__list')
    
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(mockNavItems.length)
  })

  it('navigation links are keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<SectionNav items={mockNavItems} />)
    
    await user.tab()
    
    const focusedElement = document.activeElement
    expect(focusedElement?.tagName).toBe('A')
  })

  it('renders navigation with icons', () => {
    const { container } = render(<SectionNav items={mockNavItems} />)
    
    const icons = container.querySelectorAll('.section-nav__icon')
    expect(icons).toHaveLength(mockNavItems.length)
  })

  it('handles empty items array gracefully', () => {
    render(<SectionNav items={[]} />)
    
    const nav = screen.getByRole('navigation', { name: /resume sections/i })
    expect(nav).toBeInTheDocument()
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('renders labels correctly', () => {
    render(<SectionNav items={mockNavItems} />)
    
    mockNavItems.forEach((item) => {
      const label = screen.getByText(item.label)
      expect(label).toHaveClass('section-nav__label')
    })
  })
})
