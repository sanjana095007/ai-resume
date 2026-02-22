import type { IconName } from '@components/icons'
import { profile } from './profile'

export interface ContactMethod {
  id: string
  label: string
  value: string
  icon: IconName
  href: string
}

export const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    icon: 'email',
    href: `mailto:${profile.email}`,
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    value: 'www.chowdari.in',
    icon: 'globe',
    href: profile.social.portfolio,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'vchaitanyachowdari',
    icon: 'github',
    href: profile.social.github,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'v-chaitanya-chowdari',
    icon: 'linkedin',
    href: profile.social.linkedin,
  },
  {
    id: 'twitter',
    label: 'Twitter',
    value: '@vchaitanyachai',
    icon: 'twitter',
    href: profile.social.twitter,
  },
]
