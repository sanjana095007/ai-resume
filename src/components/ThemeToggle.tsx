import { motion } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const isDark = theme === 'dark'

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      type="button"
    >
      <motion.div
        className="theme-toggle__track"
        animate={{
          backgroundColor: isDark ? '#334155' : '#e2e8f0',
        }}
        transition={transition}
      >
        <motion.div
          className="theme-toggle__thumb"
          animate={{
            x: isDark ? 22 : 2,
          }}
          transition={transition}
        >
          <motion.svg
            className="theme-toggle__icon"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            animate={{
              rotate: isDark ? 360 : 0,
              scale: isDark ? 1 : 0.8,
            }}
            transition={transition}
          >
            {isDark ? (
              <path
                d="M6 1.5V0M6 12V10.5M10.5 6H12M0 6H1.5M9.545 2.455L10.606 1.394M1.394 10.606L2.455 9.545M9.545 9.545L10.606 10.606M1.394 1.394L2.455 2.455M9 6C9 7.657 7.657 9 6 9C4.343 9 3 7.657 3 6C3 4.343 4.343 3 6 3C7.657 3 9 4.343 9 6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M10.5 6.5C10.5 8.433 8.933 10 7 10C5.067 10 3.5 8.433 3.5 6.5C3.5 4.567 5.067 3 7 3C7.126 3 7.251 3.006 7.375 3.018C6.844 3.429 6.5 4.055 6.5 4.75C6.5 5.854 7.396 6.75 8.5 6.75C9.195 6.75 9.821 6.406 10.232 5.875C10.244 5.999 10.25 6.124 10.25 6.25L10.5 6.5Z"
                fill="currentColor"
              />
            )}
          </motion.svg>
        </motion.div>
      </motion.div>
      <span className="theme-toggle__label">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
