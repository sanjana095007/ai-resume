import { NavLink } from 'react-router-dom'
import Icon from '@components/icons'
import type { SectionNavItem, SectionId } from '@data/navigation'

interface SectionNavProps {
  items: SectionNavItem[]
  activeId?: SectionId
}

export default function SectionNav({ items, activeId }: SectionNavProps) {
  const mainNavItems = items.filter((item) => item.id !== 'footer')

  return (
    <nav className="section-nav" aria-label="Resume sections">
      <ul className="section-nav__list">
        {mainNavItems.map((item) => {
          const to = item.id === 'hero' ? '/' : `/${item.id}`
          const isActive = activeId ? activeId === item.id : false

          return (
            <li key={item.id} className="section-nav__item">
              <NavLink
                to={to}
                className={({ isActive: isRouteActive }) =>
                  [
                    'section-nav__link',
                    isRouteActive || isActive
                      ? 'section-nav__link--active'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <Icon name={item.icon} className="section-nav__icon" />
                <span className="section-nav__label">{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
