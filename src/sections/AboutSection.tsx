import AnimatedSection from '@components/AnimatedSection'
import Icon from '@components/icons'
import OptimizedImage from '@components/OptimizedImage'
import SectionHeader from '@components/SectionHeader'
import { aboutParagraphs } from '@data/about'
import { partners } from '@data/partners'

interface AboutSectionProps {
  className?: string
}

export default function AboutSection({ className }: AboutSectionProps) {
  const classes = ['resume-section', 'about-section', className]
    .filter(Boolean)
    .join(' ')

  return (
    <AnimatedSection
      id="about"
      className={classes}
      ariaLabelledby="about-heading"
    >
      <SectionHeader id="about-heading" icon="info" title="About Me" />
      <div className="about-section__content">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph} className="about-section__paragraph">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="about-section__partners" aria-labelledby="about-partners">
        <div className="about-section__partners-heading">
          <Icon
            name="handshake"
            className="about-section__partners-icon"
            aria-hidden="true"
          />
          <h3 id="about-partners" className="about-section__partners-title">
            Worked With
          </h3>
        </div>
        <ul className="about-section__partners-list" role="list">
          {partners.map((partner) => (
            <li key={partner.id} className="about-section__partner">
              <figure className="about-section__partner-card">
                <OptimizedImage
                  src={partner.image}
                  webpSrc={partner.webpImage}
                  alt={partner.alt}
                  className="about-section__partner-logo"
                  width={120}
                  height={120}
                />
                <figcaption className="about-section__partner-caption">
                  <span className="about-section__partner-name">
                    {partner.name}
                  </span>
                  <span className="about-section__partner-description">
                    {partner.description}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}
