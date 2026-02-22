import AnimatedSection from '@components/AnimatedSection'
import BadgeList from '@components/BadgeList'
import SkillBar from '@components/SkillBar'
import Icon from '@components/icons'
import SectionHeader from '@components/SectionHeader'
import { languages } from '@data/personal'
import { skillCategories, type Skill } from '@data/skills'

interface SkillsSectionProps {
  className?: string
}

export default function SkillsSection({ className }: SkillsSectionProps) {
  const classes = ['resume-section', 'skills-section', className]
    .filter(Boolean)
    .join(' ')

  const isSkillArray = (skills: string[] | Skill[]): skills is Skill[] => {
    return skills.length > 0 && typeof skills[0] === 'object'
  }

  return (
    <AnimatedSection
      id="skills"
      className={classes}
      ariaLabelledby="skills-heading"
    >
      <SectionHeader
        id="skills-heading"
        icon="tools"
        title="Skills & Tools"
        subtitle="Technical stacks, platforms, and soft skills"
      />
      <div className="skills-section__grid">
        {skillCategories.map((category) => (
          <div key={category.title} className="skills-section__category">
            <h3 className="skills-section__category-title">{category.title}</h3>
            {isSkillArray(category.skills) ? (
              <div className="skills-section__bars">
                {category.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            ) : (
              <BadgeList items={category.skills} />
            )}
          </div>
        ))}
      </div>
      <div
        className="skills-section__languages"
        aria-labelledby="skills-languages-heading"
      >
        <div className="skills-section__languages-header">
          <Icon name="language" className="skills-section__languages-icon" />
          <h3
            id="skills-languages-heading"
            className="skills-section__languages-title"
          >
            Languages
          </h3>
        </div>
        <ul className="skills-section__languages-list">
          {languages.map((language) => (
            <li key={language.id} className="skills-section__languages-item">
              <span className="skills-section__language-name">
                {language.name}
              </span>
              <span className="skills-section__language-level">
                {language.proficiency}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}
