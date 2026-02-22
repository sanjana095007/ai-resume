import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './icons'
import { useReducedMotion } from '@hooks/useReducedMotion'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  const [showOffline, setShowOffline] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOffline(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOffline(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const fadeInVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.2,
      },
    },
  }

  return (
    <AnimatePresence>
      {showOffline && !isOnline && (
        <motion.div
          className="offline-indicator"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeInVariants}
        >
          <Icon name="alert" className="offline-indicator__icon" />
          <span className="offline-indicator__text">
            You're offline. Some features may be limited.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
