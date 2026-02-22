import { experiences } from '@data/experience'
import { profile } from '@data/profile'
import { projects } from '@data/projects'

export interface PersonSchema extends Record<string, unknown> {
  '@context': string
  '@type': string
  name: string
  email: string
  url: string
  image: string
  jobTitle: string
  description: string
  sameAs: string[]
}

export interface WebSiteSchema extends Record<string, unknown> {
  '@context': string
  '@type': string
  name: string
  url: string
  description: string
  author: {
    '@type': string
    name: string
  }
}

export interface OrganizationSchema extends Record<string, unknown> {
  '@context': string
  '@type': string
  name: string
  url?: string
  description?: string
  employee?: {
    '@type': string
    name: string
    jobTitle: string
  }
  foundingDate?: string
}

export interface ProjectSchema extends Record<string, unknown> {
  '@context': string
  '@type': string
  name: string
  description: string
  url?: string
  image?: string
  dateCreated?: string
  creator: {
    '@type': string
    name: string
  }
  keywords?: string[]
}

export function getPersonSchema(): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    email: profile.email,
    url: profile.social.portfolio,
    image: profile.social.portfolio + '/images/logo.png',
    jobTitle: profile.title,
    description: profile.description,
    sameAs: [
      profile.social.github,
      profile.social.linkedin,
      profile.social.twitter,
      profile.social.portfolio,
    ],
  }
}

export function getWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'V Chaitanya Chowdari Resume',
    url: 'https://www.chowdari.in/resume',
    description:
      'Professional resume and portfolio of V Chaitanya Chowdari showcasing expertise in AI automation, full stack development, and digital transformation.',
    author: {
      '@type': 'Person',
      name: profile.name,
    },
  }
}

export function getOrganizationSchemas(): OrganizationSchema[] {
  return experiences.slice(0, 3).map((exp) => {
    const schema: OrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: exp.company,
      description: exp.description,
    }

    if (exp.company.includes('VC AI')) {
      schema.employee = {
        '@type': 'Person',
        name: profile.name,
        jobTitle: exp.title,
      }
      const yearMatch = exp.period.match(/(\d{4})/)
      if (yearMatch) {
        schema.foundingDate = yearMatch[1]
      }
    }

    return schema
  })
}

export function getProjectSchemas(): ProjectSchema[] {
  return projects
    .filter((project) => project.featured)
    .map((project) => ({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.demoUrl || project.url,
      image: project.image,
      dateCreated: project.year,
      creator: {
        '@type': 'Person',
        name: profile.name,
      },
      keywords: project.tags,
    }))
}

export function getAllStructuredData(): Record<string, unknown>[] {
  return [
    getPersonSchema(),
    getWebSiteSchema(),
    ...getOrganizationSchemas(),
    ...getProjectSchemas(),
  ]
}
