import type { SectionId } from './navigation'

export interface SectionSEO {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

export const sectionSEOData: Record<SectionId, SectionSEO> = {
  hero: {
    title:
      'V Chaitanya Chowdari | AI Generalist, Automation Expert & Full Stack Developer',
    description:
      'V Chaitanya Chowdari is a creative technologist and AI generalist specializing in AI automation, AI agents, full stack development, and digital transformation.',
    keywords: [
      'V Chaitanya Chowdari',
      'AI Generalist',
      'AI Automation Expert',
      'Full Stack Developer',
      'Portfolio',
      'Resume',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  about: {
    title: 'About V Chaitanya Chowdari | AI Expert & Creative Technologist',
    description:
      "Learn about V Chaitanya Chowdari's journey as a creative technologist, AI generalist, and digital transformation expert. Discover the passion behind innovative AI solutions.",
    keywords: [
      'About',
      'V Chaitanya Chowdari',
      'Creative Technologist',
      'AI Expert',
      'Biography',
      'Background',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  experience: {
    title: 'Work Experience | V Chaitanya Chowdari',
    description:
      'Explore the professional experience of V Chaitanya Chowdari, including founding VC AI Marketing and VC AI Creator, and delivering AI-driven solutions for 15+ companies.',
    keywords: [
      'Work Experience',
      'Career',
      'VC AI Marketing',
      'VC AI Creator',
      'AI Startup',
      'Founder',
      'CEO',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  projects: {
    title: 'Projects & Portfolio | V Chaitanya Chowdari',
    description:
      'Discover innovative projects by V Chaitanya Chowdari, including Portfolio Ideas, DeFiVoice AI agent, and data science projects showcasing expertise in AI, React, and Python.',
    keywords: [
      'Projects',
      'Portfolio',
      'AI Projects',
      'Web Development',
      'React Projects',
      'DeFiVoice',
      'Data Science',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  skills: {
    title: 'Technical Skills | V Chaitanya Chowdari',
    description:
      'Technical expertise of V Chaitanya Chowdari including React.js, Python, AI/ML, automation pipelines with n8n and Make.com, and full stack development.',
    keywords: [
      'Skills',
      'React.js',
      'Python',
      'AI',
      'Machine Learning',
      'Automation',
      'n8n',
      'Make.com',
      'Full Stack',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  education: {
    title: 'Education | V Chaitanya Chowdari',
    description:
      'Educational background of V Chaitanya Chowdari including degrees from IIT Indore and academic achievements in technology and data science.',
    keywords: [
      'Education',
      'IIT Indore',
      'Academic Background',
      'Degrees',
      'Qualifications',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  certifications: {
    title: 'Certifications & Achievements | V Chaitanya Chowdari',
    description:
      'Professional certifications and achievements of V Chaitanya Chowdari in AI, machine learning, web development, and digital transformation.',
    keywords: [
      'Certifications',
      'Achievements',
      'Professional Development',
      'Credentials',
      'Awards',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  hobbies: {
    title: 'Interests & Hobbies | V Chaitanya Chowdari',
    description:
      'Personal interests and hobbies of V Chaitanya Chowdari including technology exploration, creative design, and continuous learning.',
    keywords: [
      'Hobbies',
      'Interests',
      'Personal',
      'Technology',
      'Creative',
      'Learning',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  contact: {
    title: 'Contact V Chaitanya Chowdari | Get In Touch',
    description:
      'Get in touch with V Chaitanya Chowdari for AI automation projects, full stack development, or consultation. Connect via email, LinkedIn, GitHub, or Twitter.',
    keywords: [
      'Contact',
      'Get In Touch',
      'Email',
      'LinkedIn',
      'GitHub',
      'Collaboration',
      'Hire',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
  footer: {
    title:
      'V Chaitanya Chowdari | AI Generalist, Automation Expert & Full Stack Developer',
    description:
      'V Chaitanya Chowdari is a creative technologist and AI generalist specializing in AI automation, AI agents, full stack development, and digital transformation.',
    keywords: [
      'V Chaitanya Chowdari',
      'AI Generalist',
      'AI Automation Expert',
      'Full Stack Developer',
    ],
    ogImage: 'https://www.chowdari.in/resume/og-image.png',
  },
}

export function getSectionSEO(sectionId: SectionId): SectionSEO {
  return (
    sectionSEOData[sectionId] || {
      title:
        'V Chaitanya Chowdari | AI Generalist, Automation Expert & Full Stack Developer',
      description:
        'V Chaitanya Chowdari is a creative technologist and AI generalist specializing in AI automation, AI agents, full stack development, and digital transformation.',
      keywords: [
        'V Chaitanya Chowdari',
        'AI Generalist',
        'AI Automation Expert',
        'Full Stack Developer',
      ],
      ogImage: 'https://www.chowdari.in/resume/og-image.png',
    }
  )
}
