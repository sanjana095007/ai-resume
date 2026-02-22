import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@components/icons'
import BadgeList from '@components/BadgeList'
import type { Project } from '@data/projects'
import { trackProjectInteraction } from '@utils/analytics'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { fadeIn, scaleIn } from '@utils/animations'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const prefersReducedMotion = useReducedMotion()
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen && project) {
      trackProjectInteraction(project.id, 'view')
      document.body.style.overflow = 'hidden'
      previousFocusRef.current = document.activeElement as HTMLElement

      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = ''

      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
        previousFocusRef.current = null
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, project])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const modal = modalRef.current
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable.focus()
        }
      }
    }

    modal.addEventListener('keydown', handleTabKey)
    return () => modal.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  const handleClose = () => {
    if (project) {
      trackProjectInteraction(project.id, 'close')
    }
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleLinkClick = () => {
    if (project) {
      trackProjectInteraction(project.id, 'click')
    }
  }

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="project-modal-overlay"
          onClick={handleBackdropClick}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            className="project-modal focus-trap-container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            variants={prefersReducedMotion ? fadeIn : scaleIn}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="project-modal__close"
              onClick={handleClose}
              aria-label="Close project details modal"
              type="button"
            >
              <Icon name="close" aria-hidden="true" />
            </button>

            <div className="project-modal__content">
              <div className="project-modal__header">
                <h2 id="modal-title" className="project-modal__title">
                  {project.title}
                </h2>
                {project.year && (
                  <span
                    className="project-modal__year"
                    aria-label={`Year: ${project.year}`}
                  >
                    {project.year}
                  </span>
                )}
              </div>

              <p id="modal-description" className="project-modal__description">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="project-modal__tags">
                  <h3 className="project-modal__tags-title">Technologies</h3>
                  <BadgeList items={project.tags} />
                </div>
              )}

              <div className="project-modal__actions">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="project-modal__button project-modal__button--primary"
                    onClick={handleLinkClick}
                  >
                    <Icon name="globe" />
                    View Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="project-modal__button"
                    onClick={handleLinkClick}
                  >
                    <Icon name="github" />
                    View Source
                  </a>
                )}
                {!project.demoUrl && !project.githubUrl && project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="project-modal__button project-modal__button--primary"
                    onClick={handleLinkClick}
                  >
                    <Icon name="external" />
                    Learn More
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
