import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useInView } from '@hooks/useInView'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { fadeInUp, getReducedMotionVariants } from '@utils/animations'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  ariaLabelledby?: string
  delay?: number
}

export default function AnimatedSection({
  children,
  className,
  id,
  ariaLabelledby,
  delay = 0,
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const prefersReducedMotion = useReducedMotion()

  const variants = prefersReducedMotion
    ? getReducedMotionVariants(fadeInUp)
    : fadeInUp

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      aria-labelledby={ariaLabelledby}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  )
}
