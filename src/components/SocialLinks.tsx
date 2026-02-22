import { motion } from 'framer-motion'
import Icon, { type IconName } from '@components/icons'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { tapScale } from '@utils/animations'
import { trackSocialClick } from '@utils/analytics'

interface SocialLink {
  id: string
  icon: IconName
  label: string
  href: string
}

interface SocialLinksProps {
  links: SocialLink[]
}

export default function SocialLinks({ links }: SocialLinksProps) {
  const prefersReducedMotion = useReducedMotion()

  if (!links.length) {
    return null
  }

  const handleClick = (platform: string) => {
    trackSocialClick(platform)
  }

  const enhancedHoverScale = {
    scale: 1.15,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  }

  return (
    <nav aria-label="Social media links">
      <ul className="social-links">
        {links.map((link) => (
          <li key={link.id} className="social-links__item">
            <motion.a
              className="social-links__link"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${link.label} (opens in new tab)`}
              onClick={() => handleClick(link.id)}
              whileHover={prefersReducedMotion ? undefined : enhancedHoverScale}
              whileTap={prefersReducedMotion ? undefined : tapScale}
            >
              <Icon name={link.icon} aria-hidden="true" />
            </motion.a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
