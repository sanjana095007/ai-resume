export interface Certification {
  id: string
  title: string
  issuer: string
  issued: string
  description: string
  url?: string
}

export const certifications: Certification[] = [
  {
    id: 'iit-ai-data-science',
    title:
      'Professional Certificate Program in Artificial Intelligence and Data Science',
    issuer: 'Indian Institute of Technology, Indore',
    issued: 'In Progress — Feb 2026',
    description:
      'Rigorous postgraduate program focused on advanced machine learning, data science pipelines, and production-ready AI systems.',
  },
  {
    id: '100x-generative-ai',
    title: 'Generative AI Cohort',
    issuer: '100x Engineers',
    issued: '2025',
    description:
      'Hands-on residency exploring cutting-edge generative AI tools, autonomous agent design, and applied automation workflows.',
  },
  {
    id: 'startup-india-recognition',
    title: 'Innovation Recognition',
    issuer: 'Startup India',
    issued: '2025',
    description:
      'Recognized for entrepreneurship and AI-driven innovation initiatives supporting startups and digital transformation projects.',
  },
]
