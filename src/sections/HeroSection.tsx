import { motion } from 'framer-motion'
import SocialLinks from '@components/SocialLinks'
import Icon from '@components/icons'
import OptimizedImage from '@components/OptimizedImage'
import { profile } from '@data/profile'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  fadeIn,
  fadeInUp,
  getReducedMotionVariants,
  hoverScale,
  tapScale,
} from '@utils/animations'
import { trackDownload } from '@utils/analytics'
import heroImageWebp from '@assets/images/logo.webp'

interface HeroSectionProps {
  className?: string
}

export default function HeroSection({ className }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const classes = ['resume-section', 'hero-section', className]
    .filter(Boolean)
    .join(' ')

  const fadeInVariants = prefersReducedMotion
    ? getReducedMotionVariants(fadeIn)
    : fadeIn
  const fadeInUpVariants = prefersReducedMotion
    ? getReducedMotionVariants(fadeInUp)
    : fadeInUp

  const socialLinks = [
    {
      id: 'github',
      icon: 'github' as const,
      label: 'GitHub',
      href: profile.social.github,
    },
    {
      id: 'twitter',
      icon: 'twitter' as const,
      label: 'Twitter',
      href: profile.social.twitter,
    },
    {
      id: 'linkedin',
      icon: 'linkedin' as const,
      label: 'LinkedIn',
      href: profile.social.linkedin,
    },
    {
      id: 'email',
      icon: 'email' as const,
      label: 'Email',
      href: `mailto:${profile.email}`,
    },
    {
      id: 'portfolio',
      icon: 'globe' as const,
      label: 'Portfolio',
      href: profile.social.portfolio,
    },
  ]

  const isCtaExternal = !profile.cta.href.startsWith('#')

  const handleDownload = () => {
    trackDownload('V_Chaitanya_Chowdari_Resume.pdf')
  }

  return (
    <motion.section
      id="hero"
      className={classes}
      aria-labelledby="hero-heading"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <motion.div
        className="hero-section__media"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ delay: 0.2 }}
      >
        <OptimizedImage
          src={profile.image}
          webpSrc={heroImageWebp}
          alt={profile.imageAlt}
          className="hero-section__avatar"
          width={300}
          height={300}
          eager
        />
      </motion.div>
      <div className="hero-section__content">
        <motion.span
          className="hero-section__eyebrow"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.1 }}
        >
          AI Generalist & Builder
        </motion.span>
        <motion.h1
          id="hero-heading"
          className="hero-section__title"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.2 }}
        >
          {profile.name}
        </motion.h1>
        <motion.p
          className="hero-section__subtitle"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.3 }}
        >
          {profile.title}
        </motion.p>
        <motion.p
          className="hero-section__description"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.4 }}
        >
          {profile.description}
        </motion.p>
        <motion.div
          className="hero-section__actions"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            className="hero-section__cta"
            href={profile.cta.href}
            target={isCtaExternal ? '_blank' : undefined}
            rel={isCtaExternal ? 'noreferrer noopener' : undefined}
            onClick={handleDownload}
            whileHover={prefersReducedMotion ? undefined : hoverScale}
            whileTap={prefersReducedMotion ? undefined : tapScale}
          >
            <Icon name={profile.cta.icon} className="hero-section__cta-icon" />
            <span>{profile.cta.label}</span>
          </motion.a>
          <motion.a
            className="hero-section__cta hero-section__cta--secondary"
            href={`mailto:${profile.email}`}
            whileHover={prefersReducedMotion ? undefined : hoverScale}
            whileTap={prefersReducedMotion ? undefined : tapScale}
          >
            <Icon name="email" className="hero-section__cta-icon" />
            <span>Let's Connect</span>
          </motion.a>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.6 }}
        >
          <SocialLinks links={socialLinks} />
        </motion.div>
      </div>
    </motion.section>
  )
}
