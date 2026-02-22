import type { ReactNode } from 'react'
import Icon, { type IconName } from '@components/icons'

interface SectionHeaderProps {
  id?: string
  icon?: IconName
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function SectionHeader({
  id,
  icon,
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div className="section-header__heading">
        {icon ? (
          <Icon
            name={icon}
            className="section-header__icon"
            aria-hidden="true"
          />
        ) : null}
        <div>
          <h2 id={id} className="section-header__title">
            {title}
          </h2>
          {subtitle ? (
            <p className="section-header__subtitle">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {action ? <div className="section-header__action">{action}</div> : null}
    </header>
  )
}
