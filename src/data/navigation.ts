import type { IconName } from '@components/icons'

export const sectionIds = [
  'hero',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'certifications',
  'hobbies',
  'contact',
  'footer',
] as const

export type SectionId = (typeof sectionIds)[number]

export interface SectionNavItem {
  id: SectionId
  label: string
  icon: IconName
}

export const sectionNavItems: SectionNavItem[] = [
  { id: 'hero', label: 'Home', icon: 'user' },
  { id: 'about', label: 'About', icon: 'info' },
  { id: 'experience', label: 'Experience', icon: 'suitcase' },
  { id: 'projects', label: 'Projects', icon: 'code' },
  { id: 'skills', label: 'Skills', icon: 'tools' },
  { id: 'education', label: 'Education', icon: 'graduate' },
  { id: 'certifications', label: 'Certifications', icon: 'award' },
  { id: 'hobbies', label: 'Hobbies', icon: 'puzzle' },
  { id: 'contact', label: 'Contact', icon: 'email' },
  { id: 'footer', label: 'Footer', icon: 'globe' },
]

export const defaultSectionId: SectionId = 'hero'

export function isSectionId(value?: string | null): value is SectionId {
  return sectionIds.includes((value ?? '') as SectionId)
}
