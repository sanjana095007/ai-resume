export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  skills: string[] | Skill[]
}

export const techSkills: Skill[] = [
  { name: 'HTML5', level: 90 },
  { name: 'Java', level: 75 },
  { name: 'AI Automation', level: 95 },
  { name: 'AI Agents', level: 92 },
  { name: 'Python', level: 88 },
  { name: 'C++', level: 70 },
  { name: 'Git & GitHub', level: 85 },
  { name: 'Open Source', level: 80 },
]

export const tools: Skill[] = [
  { name: 'Visual Studio Code', level: 95 },
  { name: 'Firefox', level: 85 },
  { name: 'Chrome', level: 90 },
  { name: 'Edge', level: 80 },
  { name: 'Wordpress - Build Websites', level: 85 },
  { name: 'Wix Studio - Build Websites', level: 82 },
  { name: 'Notion', level: 88 },
  { name: 'Microsoft Todo', level: 90 },
  { name: 'n8n - Automation Tool', level: 92 },
  { name: 'Make.com - Automation Tool', level: 90 },
  { name: 'Veo3 - Generate Image & Video', level: 78 },
  { name: 'Comfy UI - Generate Image & Video', level: 75 },
  { name: 'Weavy AI - Generate Image & Video', level: 80 },
  { name: 'Ollama - Run Local Models', level: 85 },
  { name: 'ActivePieces - Automation Tool', level: 87 },
]

export const softSkills: string[] = [
  'Hardworking',
  'Attentive Listener',
  'Team-player',
  'Good communication',
  'Honest and fun',
  'Enjoys working closely with others',
]

export const skillCategories: SkillCategory[] = [
  {
    title: 'Tech Skills',
    skills: techSkills,
  },
  {
    title: 'Tools',
    skills: tools,
  },
  {
    title: 'Soft Skills',
    skills: softSkills,
  },
]
