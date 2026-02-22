import { motion } from 'framer-motion'
import AnimatedSection from '@components/AnimatedSection'
import SectionHeader from '@components/SectionHeader'
import StatCard from '@components/StatCard'
import ContactForm from '@components/ContactForm'
import type { ContactMethod } from '@data/contact'
import { contactMethods } from '@data/contact'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  getReducedMotionVariants,
  staggerContainer,
  staggerItem,
} from '@utils/animations'

interface ContactSectionProps {
  className?: string
}

export default function ContactSection({ className }: ContactSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const classes = ['resume-section', 'contact-section', className]
    .filter(Boolean)
    .join(' ')

  const containerVariants = prefersReducedMotion
    ? getReducedMotionVariants(staggerContainer)
    : staggerContainer
  const itemVariants = prefersReducedMotion
    ? getReducedMotionVariants(staggerItem)
    : staggerItem

  return (
    <AnimatedSection
      id="contact"
      className={classes}
      ariaLabelledby="contact-heading"
    >
      <SectionHeader
        id="contact-heading"
        icon="email"
        title="Contact"
        subtitle="Let's collaborate, partner, or just say hello"
      />
      <motion.div
        className="contact-section__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        {contactMethods.map((method: ContactMethod) => (
          <motion.div key={method.id} variants={itemVariants}>
            <StatCard
              icon={method.icon}
              label={method.label}
              value={method.value}
              href={method.href}
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="contact-section__form-wrapper">
        <ContactForm />
      </div>
    </AnimatedSection>
  )
}
