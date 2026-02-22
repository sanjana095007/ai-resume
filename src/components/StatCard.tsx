import { motion } from 'framer-motion'
import Icon, { type IconName } from '@components/icons'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { hoverScale, tapScale } from '@utils/animations'

interface StatCardProps {
  icon: IconName
  label: string
  value: string
  href?: string
  description?: string
}

export default function StatCard({
  icon,
  label,
  value,
  href,
  description,
}: StatCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const isExternalLink = href ? /^https?:/.test(href) : false
  const content = (
    <>
      <div className="stat-card__icon-wrapper">
        <Icon name={icon} className="stat-card__icon" />
      </div>
      <div className="stat-card__content">
        <span className="stat-card__label">{label}</span>
        <span className="stat-card__value">{value}</span>
        {description ? (
          <p className="stat-card__description">{description}</p>
        ) : null}
      </div>
    </>
  )

  if (href) {
    return (
      <motion.a
        className="stat-card stat-card--link"
        href={href}
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noreferrer noopener' : undefined}
        whileHover={prefersReducedMotion ? undefined : hoverScale}
        whileTap={prefersReducedMotion ? undefined : tapScale}
      >
        {content}
      </motion.a>
    )
  }

  return <div className="stat-card">{content}</div>
}
