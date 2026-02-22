import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

interface SkeletonProps {
  width?: string
  height?: string
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
}

export default function Skeleton({
  width = '100%',
  height = '1rem',
  className,
  variant = 'rectangular',
}: SkeletonProps) {
  const prefersReducedMotion = useReducedMotion()

  const baseClasses = 'skeleton'
  const variantClasses = {
    text: 'skeleton--text',
    circular: 'skeleton--circular',
    rectangular: 'skeleton--rectangular',
  }

  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ')

  const style = {
    width,
    height,
  }

  return (
    <motion.div
      className={classes}
      style={style}
      initial={{ opacity: 0.6 }}
      animate={
        prefersReducedMotion
          ? { opacity: 0.6 }
          : {
              opacity: [0.6, 1, 0.6],
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    />
  )
}
