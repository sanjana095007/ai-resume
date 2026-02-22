export interface Language {
  id: string
  name: string
  proficiency: string
}

export const languages: Language[] = [
  { id: 'english', name: 'English', proficiency: 'Intermediate' },
  { id: 'kannada', name: 'Kannada', proficiency: 'Intermediate' },
  { id: 'telugu', name: 'Telugu', proficiency: 'Expert' },
  { id: 'hindi', name: 'Hindi', proficiency: 'Intermediate' },
]

export const hobbies: string[] = [
  'Coding',
  'Doing Adventure',
  'Expliring to the Deept',
  'Music',
]
