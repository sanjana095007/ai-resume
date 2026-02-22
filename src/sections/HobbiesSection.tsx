import AnimatedSection from '@components/AnimatedSection'
import BadgeList from '@components/BadgeList'
import SectionHeader from '@components/SectionHeader'
import { hobbies } from '@data/personal'

interface HobbiesSectionProps {
  className?: string
}

export default function HobbiesSection({ className }: HobbiesSectionProps) {
  const classes = ['resume-section', 'hobbies-section', className]
    .filter(Boolean)
    .join(' ')

  return (
    <AnimatedSection
      id="hobbies"
      className={classes}
      ariaLabelledby="hobbies-heading"
    >
      <SectionHeader id="hobbies-heading" icon="puzzle" title="Hobbies" />
      <BadgeList items={hobbies} />
    </AnimatedSection>
  )
}
