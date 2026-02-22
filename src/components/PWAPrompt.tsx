import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRegisterSW } from 'virtual:pwa-register/react'
import Icon from './icons'
import { useReducedMotion } from '@hooks/useReducedMotion'

export default function PWAPrompt() {
  const prefersReducedMotion = useReducedMotion()
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.log('[PWA] Service Worker registered:', registration)
    },
    onRegisterError(error) {
      console.error('[PWA] Service Worker registration error:', error)
    },
  })

  useEffect(() => {
    if (needRefresh) {
      setShowUpdatePrompt(true)
    }
  }, [needRefresh])

  const handleUpdate = async () => {
    await updateServiceWorker(true)
    setShowUpdatePrompt(false)
    setNeedRefresh(false)
  }

  const handleDismiss = () => {
    setShowUpdatePrompt(false)
    setNeedRefresh(false)
  }

  const handleDismissOffline = () => {
    setOfflineReady(false)
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50,
      scale: 0.9,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.2,
      },
    },
  }

  return (
    <>
      <AnimatePresence>
        {showUpdatePrompt && needRefresh && (
          <motion.div
            className="pwa-prompt"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInVariants}
          >
            <div className="pwa-prompt__content">
              <Icon name="refresh" className="pwa-prompt__icon" />
              <div className="pwa-prompt__text">
                <h3 className="pwa-prompt__title">Update Available</h3>
                <p className="pwa-prompt__message">
                  A new version of this app is available. Refresh to update.
                </p>
              </div>
            </div>
            <div className="pwa-prompt__actions">
              <button
                onClick={handleUpdate}
                className="pwa-prompt__button pwa-prompt__button--primary"
                type="button"
              >
                Update
              </button>
              <button
                onClick={handleDismiss}
                className="pwa-prompt__button pwa-prompt__button--secondary"
                type="button"
              >
                Later
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {offlineReady && (
          <motion.div
            className="pwa-prompt pwa-prompt--offline"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInVariants}
          >
            <div className="pwa-prompt__content">
              <Icon name="check" className="pwa-prompt__icon" />
              <div className="pwa-prompt__text">
                <h3 className="pwa-prompt__title">Ready for Offline</h3>
                <p className="pwa-prompt__message">
                  This app is now available offline!
                </p>
              </div>
            </div>
            <div className="pwa-prompt__actions">
              <button
                onClick={handleDismissOffline}
                className="pwa-prompt__button pwa-prompt__button--secondary"
                type="button"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
