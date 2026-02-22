import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const baseUrl = 'https://www.chowdari.in/resume'

const sections = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/experience', priority: '0.9', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'monthly' },
  { path: '/skills', priority: '0.8', changefreq: 'monthly' },
  { path: '/education', priority: '0.7', changefreq: 'yearly' },
  { path: '/certifications', priority: '0.7', changefreq: 'monthly' },
  { path: '/hobbies', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
]

const currentDate = new Date().toISOString()

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sections
  .map(
    (section) => `  <url>
    <loc>${baseUrl}${section.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${section.changefreq}</changefreq>
    <priority>${section.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

const outputPath = resolve(__dirname, '../public/sitemap.xml')

try {
  writeFileSync(outputPath, sitemap, 'utf8')
  console.log('✅ sitemap.xml generated successfully at:', outputPath)
} catch (error) {
  console.error('❌ Error generating sitemap:', error)
  process.exit(1)
}
