import { Helmet } from 'react-helmet-async'
import { useTheme } from '@context/ThemeContext'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterHandle?: string
  noindex?: boolean
  nofollow?: boolean
  structuredData?: Record<string, unknown>[]
}

export default function SEO({
  title = 'V Chaitanya Chowdari | AI Generalist, Automation Expert & Full Stack Developer',
  description = 'V Chaitanya Chowdari is a creative technologist and AI generalist specializing in AI automation, AI agents, full stack development, and digital transformation.',
  keywords = [
    'V Chaitanya Chowdari',
    'AI Generalist',
    'AI Automation Expert',
    'AI Agents Builder',
    'Full Stack Developer',
    'React.js',
    'Python',
    'Machine Learning',
  ],
  canonicalUrl = 'https://www.chowdari.in/resume',
  ogImage = 'https://www.chowdari.in/resume/images/logo.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterHandle = '@vchaitanyachai',
  noindex = false,
  nofollow = false,
  structuredData = [],
}: SEOProps) {
  const { theme } = useTheme()

  const themeColor = theme === 'dark' ? '#0f172a' : '#ffffff'
  const backgroundColor = theme === 'dark' ? '#0f172a' : '#ffffff'

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ')

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      <link rel="canonical" href={canonicalUrl} />

      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      <meta name="theme-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={backgroundColor} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="V Chaitanya Chowdari" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      <meta name="author" content="V Chaitanya Chowdari" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {structuredData.map((data, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}
