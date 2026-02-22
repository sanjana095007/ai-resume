import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@components/AnimatedSection'
import SectionHeader from '@components/SectionHeader'
import ProjectCarousel from '@components/ProjectCarousel'
import ProjectModal from '@components/ProjectModal'
import type { OtherProject, Project } from '@data/projects'
import { otherProjects, projects } from '@data/projects'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  getReducedMotionVariants,
  hoverScale,
  staggerContainer,
  staggerItem,
} from '@utils/animations'

interface ProjectsSectionProps {
  className?: string
}

export default function ProjectsSection({ className }: ProjectsSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const classes = ['resume-section', 'projects-section', className]
    .filter(Boolean)
    .join(' ')

  const containerVariants = prefersReducedMotion
    ? getReducedMotionVariants(staggerContainer)
    : staggerContainer
  const itemVariants = prefersReducedMotion
    ? getReducedMotionVariants(staggerItem)
    : staggerItem

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <AnimatedSection
      id="projects"
      className={classes}
      ariaLabelledby="projects-heading"
    >
      <SectionHeader
        id="projects-heading"
        icon="code"
        title="Personal Projects"
        subtitle="Ideas, experiments, and live products"
      />

      {featuredProjects.length > 0 && (
        <div className="projects-section__featured">
          <ProjectCarousel
            projects={featuredProjects}
            onProjectClick={handleProjectClick}
          />
        </div>
      )}

      <motion.div
        className="projects-section__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        role="list"
      >
        {projects
          .filter((p) => !p.featured)
          .map((project: Project) => (
            <motion.article
              key={project.id}
              className="projects-section__card"
              variants={itemVariants}
              whileHover={prefersReducedMotion ? undefined : hoverScale}
              onClick={() => handleProjectClick(project)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleProjectClick(project)
                }
              }}
            >
              <h3 className="projects-section__card-title">{project.title}</h3>
              <p className="projects-section__card-description">
                {project.description}
              </p>
            </motion.article>
          ))}
      </motion.div>

      <div
        className="projects-section__other"
        aria-labelledby="projects-other-heading"
      >
        <h4
          id="projects-other-heading"
          className="projects-section__other-title"
        >
          Other Notable Projects
        </h4>
        <nav aria-label="Other projects">
          <ul className="projects-section__other-list" role="list">
            {otherProjects.map((project: OtherProject) => {
              const href = project.url ?? '#'
              const isPlaceholder = !project.url || project.url === '#'

              return (
                <li key={project.id} className="projects-section__other-item">
                  <a
                    href={href}
                    target={isPlaceholder ? undefined : '_blank'}
                    rel={isPlaceholder ? undefined : 'noreferrer noopener'}
                    className="projects-section__other-link"
                    aria-label={
                      isPlaceholder
                        ? project.title
                        : `${project.title} (opens in new tab)`
                    }
                  >
                    {project.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </AnimatedSection>
  )
}
