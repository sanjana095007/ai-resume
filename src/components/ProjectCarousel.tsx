import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@components/icons'
import BadgeList from '@components/BadgeList'
import type { Project } from '@data/projects'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { hoverScale } from '@utils/animations'

interface ProjectCarouselProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

export default function ProjectCarousel({
  projects,
  onProjectClick,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious()
    } else if (e.key === 'ArrowRight') {
      handleNext()
    }
  }

  const currentProject = projects[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }

  return (
    <div
      className="project-carousel"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Featured projects carousel"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="project-carousel__container">
        <button
          className="project-carousel__nav project-carousel__nav--prev"
          onClick={handlePrevious}
          aria-label="Previous project"
          type="button"
        >
          <Icon name="chevron-left" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </button>

        <div className="project-carousel__content" tabIndex={0}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="project-carousel__slide"
            >
              <motion.article
                id={`project-${currentIndex}`}
                className="project-carousel__card"
                whileHover={prefersReducedMotion ? undefined : hoverScale}
                onClick={() => onProjectClick(currentProject)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${currentProject.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onProjectClick(currentProject)
                  }
                }}
              >
                <div className="project-carousel__card-header">
                  <h3 className="project-carousel__card-title">
                    {currentProject.title}
                  </h3>
                  {currentProject.year && (
                    <span className="project-carousel__card-year">
                      {currentProject.year}
                    </span>
                  )}
                </div>

                <p className="project-carousel__card-description">
                  {currentProject.description}
                </p>

                {currentProject.tags && currentProject.tags.length > 0 && (
                  <div className="project-carousel__card-tags">
                    <BadgeList items={currentProject.tags.slice(0, 4)} />
                  </div>
                )}

                <div className="project-carousel__card-footer">
                  <span className="project-carousel__card-cta">
                    View Details
                    <Icon name="arrow-right" />
                  </span>
                </div>
              </motion.article>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="project-carousel__nav project-carousel__nav--next"
          onClick={handleNext}
          aria-label="Next project"
          type="button"
        >
          <Icon name="chevron-right" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </button>
      </div>

      <div
        className="project-carousel__indicators"
        role="tablist"
        aria-label="Project indicators"
      >
        {projects.map((project, index) => (
          <button
            key={index}
            className={`project-carousel__indicator ${
              index === currentIndex
                ? 'project-carousel__indicator--active'
                : ''
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            role="tab"
            aria-label={`View project ${index + 1}: ${project.title}`}
            aria-selected={index === currentIndex}
            aria-controls={`project-${index}`}
            type="button"
          />
        ))}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing project {currentIndex + 1} of {projects.length}:{' '}
        {currentProject.title}
      </div>
    </div>
  )
}
