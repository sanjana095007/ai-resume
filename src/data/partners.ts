import googleLogo from '@assets/images/company/google_logo.png'
import googleLogoWebp from '@assets/images/company/google_logo.webp'
import metaLogo from '@assets/images/company/meta_logo.svg'
import startupIndiaLogo from '@assets/images/company/startup_india_logo.png'
import startupIndiaLogoWebp from '@assets/images/company/startup_india_logo.webp'

export interface Partner {
  id: string
  name: string
  description: string
  image: string
  webpImage?: string
  alt: string
}

export const partners: Partner[] = [
  {
    id: 'google',
    name: 'Google',
    description: 'Technology Partner and Collaboration',
    image: googleLogo,
    webpImage: googleLogoWebp,
    alt: 'Google - Technology Partner and Collaboration',
  },
  {
    id: 'meta',
    name: 'Meta',
    description: 'Technology Partner and Collaboration',
    image: metaLogo,
    alt: 'Meta - Technology Partner and Collaboration',
  },
  {
    id: 'startup-india',
    name: 'Startup India',
    description: 'Government Initiative Recognition',
    image: startupIndiaLogo,
    webpImage: startupIndiaLogoWebp,
    alt: 'Startup India - Government Initiative Recognition',
  },
]
