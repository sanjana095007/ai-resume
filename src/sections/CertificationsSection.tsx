import AnimatedSection from '@components/AnimatedSection'
import SectionHeader from '@components/SectionHeader'
import type { Certification } from '@data/certifications'
import { certifications } from '@data/certifications'

interface CertificationsSectionProps {
  className?: string
}

export default function CertificationsSection({
  className,
}: CertificationsSectionProps) {
  const classes = ['resume-section', 'certifications-section', className]
    .filter(Boolean)
    .join(' ')

  return (
    <AnimatedSection
      id="certifications"
      className={classes}
      ariaLabelledby="certifications-heading"
    >
      <SectionHeader
        id="certifications-heading"
        icon="award"
        title="Certifications"
        subtitle="Recognitions and credentials"
      />
      <ul className="certifications-section__list">
        {certifications.map((certification: Certification) => (
          <li key={certification.id} className="certifications-section__item">
            <div className="certifications-section__item-header">
              <h3 className="certifications-section__title">
                {certification.title}
              </h3>
              <span className="certifications-section__issued">
                {certification.issued}
              </span>
            </div>
            <p className="certifications-section__issuer">
              {certification.issuer}
            </p>
            <p className="certifications-section__description">
              {certification.description}
            </p>
            {certification.url ? (
              <a
                href={certification.url}
                className="certifications-section__link"
                target="_blank"
                rel="noreferrer noopener"
              >
                View Credential
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  )
}
