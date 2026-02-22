export interface Project {
  id: string
  title: string
  url?: string
  description: string
  image?: string
  tags: string[]
  featured?: boolean
  githubUrl?: string
  demoUrl?: string
  year?: string
}

export interface OtherProject {
  id: string
  title: string
  url?: string
}

export const projects: Project[] = [
  {
    id: 'portfolio-ideas',
    title: 'Portfolio Ideas',
    url: 'https://portfolioideas.chowdari.in/',
    description:
      'Discover my Portfolio Ideas Website - a curated digital hub designed to present forward-thinking concepts, design experiments, and innovation-driven projects. Navigate through immersive layouts, conceptual showcases, and prototype previews that reflect a blend of creativity, technical prowess, and strategic vision. This platform goes beyond display - it is a sandbox of ideas built to inspire, iterate, and push the boundaries of what is next.',
    tags: ['React', 'TypeScript', 'Design', 'UI/UX'],
    featured: true,
    demoUrl: 'https://portfolioideas.chowdari.in/',
    year: '2024',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    url: 'https://www.chowdari.in/',
    description:
      'Explore my personal portfolio website crafted to showcase my skills, projects, and vision. Dive into interactive case studies, view live demos, and experience a digital space built with precision, creativity, and purpose.',
    tags: ['React', 'Animation', 'Responsive', 'Modern Design'],
    featured: true,
    demoUrl: 'https://www.chowdari.in/',
    year: '2024',
  },
  {
    id: 'defivoice',
    title: 'DeFiVoice',
    url: 'https://hotelzeitaku.netlify.app/',
    description:
      'DeFiVoice is a voice activated AI agent that enables users to trade, create team coins, and access real time market insights hands free. Built during a fast paced hackathon, it leverages AI driven strategies, advanced NLP, and noise resistant voice recognition to bring seamless automation to decentralized finance.',
    tags: ['AI', 'Voice Recognition', 'DeFi', 'NLP', 'Hackathon'],
    featured: true,
    demoUrl: 'https://hotelzeitaku.netlify.app/',
    year: '2024',
  },
  {
    id: 'commodity-prices',
    title: 'Global Commodity Prices Analysis',
    url: 'https://drive.google.com/file/d/1bFUnwS0zdjWDhYy6wdBcEev9XrVVdTCr/view',
    description:
      'Explore decades of global economic patterns through my latest data science project. Analyze commodity prices from 1960-2022, uncover trends in oil, coffee, sugar, and more, and visualize key market insights all powered by Python, Pandas, SciPy, and advanced data storytelling.',
    tags: ['Python', 'Data Science', 'Pandas', 'SciPy', 'Analytics'],
    featured: false,
    demoUrl:
      'https://drive.google.com/file/d/1bFUnwS0zdjWDhYy6wdBcEev9XrVVdTCr/view',
    year: '2023',
  },
]

export const otherProjects: OtherProject[] = [
  { id: 'coding-agents', title: 'Coding Agents', url: '#' },
  { id: 'prompt-enhancer', title: 'Prompt Enhancer', url: '#' },
  { id: 'job-search-agent', title: 'Job search agent', url: '#' },
  { id: 'blog-content-agent', title: 'Blog Contant Creation Agent', url: '#' },
  { id: 'seo-automation', title: 'SEO Optimisation Automation', url: '#' },
  { id: 'content-automation', title: 'Contant Creation Automation', url: '#' },
]
