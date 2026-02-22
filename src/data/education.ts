export interface Education {
  id: string
  institution: string
  program: string
  period: string
}

export const education: Education[] = [
  {
    id: '100x-engineers',
    institution: '100x Engineers',
    program: 'Generative AI',
    period: 'July 2025 - Dec 2025',
  },
  {
    id: 'iit-indore',
    institution: 'Indian Institute of Technology, Indore',
    program:
      'Professional Certificate Program in Artificial Intelligence and Data Science',
    period: 'Oct 2024 - Feb 2026',
  },
  {
    id: 'biet',
    institution: 'Babuji Institute of Engineering and Technology',
    program: 'Computer Science and Engineering and Technology',
    period: 'Sep 2024 - Sep 2028',
  },
]
