import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

interface SkillBarProps {
  name: string
  level: number
  delay?: number
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="skill-bar" role="group" aria-label={`${name} skill level`}>
      <div className="skill-bar__header">
        <span
          className="skill-bar__name"
          id={`skill-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {name}
        </span>
        <span
          className="skill-bar__level"
          aria-label={`${level} percent proficiency`}
        >
          {level}%
        </span>
      </div>
      <div
        className="skill-bar__track"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby={`skill-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <motion.div
          className="skill-bar__fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={
            prefersReducedMotion
              ? { duration: 0.01 }
              : {
                  duration: 1,
                  delay: delay,
                  ease: [0.4, 0, 0.2, 1],
                }
          }
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">
        {name}: {level}% proficiency
      </span>
    </div>
  )
}
