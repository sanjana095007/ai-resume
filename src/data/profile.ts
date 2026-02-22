import heroImage from '@assets/images/logo.png'
import type { IconName } from '@components/icons'

export interface Profile {
  name: string
  title: string
  email: string
  description: string
  image: string
  imageAlt: string
  cta: {
    label: string
    href: string
    icon: IconName
  }
  social: {
    github: string
    twitter: string
    linkedin: string
    portfolio: string
  }
}

export const profile: Profile = {
  name: 'V Chaitanya Chowdari',
  title: 'AI Generilist | AI Automation Expert | AI Agents Builder',
  email: 'vchaitanya@chowdari.in',
  description:
    "I'm a creative technologist and designer, passionate about turning ideas into immersive digital experiences. I blend technical precision with artistic vision to build innovative solutions that stand out. Always driven by curiosity, I continuously explore new technologies, refine my craft, and push creative boundaries to deliver work that speaks for itself.",
  image: heroImage,
  imageAlt:
    'V Chaitanya Chowdari - AI Generalist, Automation Expert, and Full Stack Developer',
  cta: {
    label: 'Download PDF',
    href: '/V_Chaitanya_Chowdari_Resume.pdf',
    icon: 'download',
  },
  social: {
    github: 'https://github.com/vchaitanyachowdari',
    twitter: 'https://x.com/vchaitanyachai?s=11',
    linkedin: 'https://www.linkedin.com/in/v-chaitanya-chowdari-bb3733202',
    portfolio: 'https://www.chowdari.in',
  },
}

export const seoData = {
  title:
    'V Chaitanya Chowdari | AI Generalist, Automation Expert & Full Stack Developer',
  description:
    'V Chaitanya Chowdari is a creative technologist and AI generalist specializing in AI automation, AI agents, full stack development, and digital transformation. Founder of VC AI Marketing and VC AI Creator with expertise in React.js, Python, and intelligent automation systems.',
  keywords: [
    'V Chaitanya Chowdari',
    'AI Generalist',
    'AI Automation Expert',
    'AI Agents Builder',
    'Full Stack Developer',
    'React.js',
    'Python',
    'Machine Learning',
    'Data Science',
    'IIT Indore',
    'Web Development',
    'Mobile Development',
    'React Native',
    'AI Startup',
    'Digital Transformation',
    'Automation Pipelines',
    'n8n',
    'Make.com',
  ],
  canonicalUrl: 'https://www.chowdari.in/resume',
  ogImage: 'https://www.chowdari.in/resume/images/logo.png',
  twitterHandle: '@vchaitanyachai',
}
