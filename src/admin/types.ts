export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  summary: string;
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  level: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa: string;
  description: string;
}

export interface Project {
  id: number;
  name: string;
  tech: string;
  period: string;
  link: string;
  description: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
}

export interface ResumeData {
  profile: Profile;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
}