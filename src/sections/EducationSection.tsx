import AnimatedSection from '@components/AnimatedSection'
import SectionHeader from '@components/SectionHeader'
import type { Education } from '@data/education'
import { education } from '@data/education'

interface EducationSectionProps {
  className?: string
}

export default function EducationSection({ className }: EducationSectionProps) {
  const classes = ['resume-section', 'education-section', className]
    .filter(Boolean)
    .join(' ')

  return (
    <AnimatedSection
      id="education"
      className={classes}
      ariaLabelledby="education-heading"
    >
      <SectionHeader
        id="education-heading"
        icon="graduate"
        title="Education"
        subtitle="Formal programs and continuous learning"
      />
      <ul className="education-section__list">
        {education.map((item: Education) => (
          <li key={item.id} className="education-section__item">
            <h3 className="education-section__institution">
              {item.institution}
            </h3>
            <p className="education-section__program">{item.program}</p>
            <span className="education-section__period">{item.period}</span>
          </li>
        ))}
      </ul>
    </AnimatedSection>
  )
}
