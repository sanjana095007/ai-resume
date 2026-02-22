import { useState } from 'react';
import Sidebar from './Sidebar';
import ResumePreview from './ResumePreview';
import ProfileEditor from './editors/ProfileEditor';
import SkillsEditor from './editors/SkillsEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import { ResumeData } from './types';
import EducationEditor from './editors/EducationEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import CertificationsEditor from './editors/CertificationsEditor';

// ─── Default resume data ───────────────────────────────────────────────────────
const INITIAL_DATA: ResumeData = {
  profile: {
    name:     'V Chaitanya Chowdari',
    title:    'AI Generalist | AI Automation Expert | AI Agents Builder',
    email:    'vchaitanya@chowdari.in',
    phone:    '+91 98765 43210',
    location: 'Hyderabad, India',
    website:  'https://chowdari.in',
    linkedin: 'https://linkedin.com/in/v-chaitanya-chowdari-bb3733202',
    github:   'https://github.com/vchaitanyachowdari',
    twitter:  'https://x.com/vchaitanyachai',
    summary:  'Passionate AI Generalist and Full-Stack Developer with expertise in building intelligent automation systems, AI agents, and scalable web applications.',
  },
  skills: [
    { id: 1, category: 'AI & ML',   name: 'LLMs / GPT / Claude',      level: 95 },
    { id: 2, category: 'AI & ML',   name: 'AI Agents & Automation',    level: 92 },
    { id: 3, category: 'AI & ML',   name: 'LangChain / LlamaIndex',    level: 88 },
    { id: 4, category: 'Frontend',  name: 'React / TypeScript',         level: 90 },
    { id: 5, category: 'Frontend',  name: 'Vite / Next.js',             level: 85 },
    { id: 6, category: 'Backend',   name: 'Node.js / Express',          level: 82 },
    { id: 7, category: 'Backend',   name: 'Python / FastAPI',           level: 85 },
    { id: 8, category: 'DevOps',    name: 'Docker / Kubernetes',        level: 75 },
  ],
  experience: [
    {
      id: 1,
      company:     'TechVentures AI',
      role:        'Senior AI Engineer',
      period:      'Jan 2023 – Present',
      location:    'Hyderabad, India',
      description: 'Led development of enterprise AI automation pipelines and multi-agent systems.',
      highlights:  [
        'Built RAG-based knowledge systems reducing support tickets by 40%',
        'Designed AI agent orchestration platform handling 10k+ daily tasks',
        'Led team of 5 engineers delivering AI features on schedule',
      ],
    },
    {
      id: 2,
      company:     'DataSync Solutions',
      role:        'Full Stack Developer',
      period:      'Jun 2021 – Dec 2022',
      location:    'Bangalore, India',
      description: 'Developed scalable React applications and REST APIs.',
      highlights:  [
        'Architected React component library used across 3 products',
        'Reduced API latency by 60% through caching and optimization',
      ],
    },
  ],
  education: [
    {
      id:          1,
      institution: 'JNTU Hyderabad',
      degree:      'B.Tech in Computer Science Engineering',
      period:      '2017 – 2021',
      location:    'Hyderabad, India',
      gpa:         '8.4 / 10.0',
      description: 'Specialized in Machine Learning and Data Science.',
    },
  ],
  projects: [
    {
      id:          1,
      name:        'AutoAgent Platform',
      tech:        'Python, LangChain, FastAPI, React',
      period:      '2023',
      link:        'https://github.com/vchaitanyachowdari',
      description: 'Autonomous AI agent platform for business process automation with 20+ integrations.',
    },
    {
      id:          2,
      name:        'Resume.AI Builder',
      tech:        'React, TypeScript, OpenAI API, Vite',
      period:      '2024',
      link:        'https://resume.chowdari.in',
      description: 'AI-powered resume builder that generates tailored resumes using GPT-4.',
    },
  ],
  certifications: [
    { id: 1, name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023', credentialId: 'AWS-SAA-C03-123456' },
    { id: 2, name: 'TensorFlow Developer Certificate',  issuer: 'Google',              year: '2022', credentialId: 'TF-DEV-789012'       },
  ],
};

// ─── Section map ───────────────────────────────────────────────────────────────
const SECTION_LABELS: Record<string, string> = {
  profile:        '👤 Profile',
  skills:         '⚡ Skills',
  experience:     '💼 Experience',
  education:      '🎓 Education',
  projects:       '🚀 Projects',
  certifications: '🏆 Certifications',
};

interface Props {
  user: { username: string; role: 'admin' | 'viewer'; name: string };
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: Props) {
  const [data,           setData]          = useState<ResumeData>(INITIAL_DATA);
  const [activeSection,  setActiveSection] = useState('profile');
  const [showPreview,    setShowPreview]   = useState(false);
  const [saved,          setSaved]         = useState(false);

  const isAdmin = user.role === 'admin';

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    // TODO: add your API call here to persist data
    // e.g. fetch('/api/resume', { method: 'PUT', body: JSON.stringify(data) })
  };

  const editorMap: Record<string, React.ReactNode> = {
    profile:        <ProfileEditor        data={data} onChange={setData} />,
    skills:         <SkillsEditor         data={data} onChange={setData} />,
    experience:     <ExperienceEditor     data={data} onChange={setData} />,
    education:      <EducationEditor      data={data} onChange={setData} />,
    projects:       <ProjectsEditor       data={data} onChange={setData} />,
    certifications: <CertificationsEditor data={data} onChange={setData} />,
  };

  return (
    <div style={styles.layout}>

      {/* ── SIDEBAR ── */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={onLogout}
      />

      {/* ── MAIN ── */}
      <div style={styles.main}>

        {/* Top bar */}
        <div style={styles.topbar}>
          <div>
            <h2 style={styles.topbarTitle}>{SECTION_LABELS[activeSection]}</h2>
            <p style={styles.topbarSub}>
              {isAdmin ? 'Edit fields below — preview updates live' : 'View-only mode'}
            </p>
          </div>
          <div style={styles.topbarActions}>
            {/* Preview toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              style={{
                ...styles.previewBtn,
                background:   showPreview ? '#f0fdf4' : '#fff',
                color:        showPreview ? '#16a34a' : '#475569',
                borderColor:  showPreview ? '#86efac' : '#e2e8f0',
              }}
            >
              {showPreview ? '🙈 Hide Preview' : '👁 Show Preview'}
            </button>

            {/* Save — admin only */}
            {isAdmin && (
              <button
                onClick={handleSave}
                style={{
                  ...styles.saveBtn,
                  background: saved
                    ? 'linear-gradient(135deg,#16a34a,#15803d)'
                    : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                }}
              >
                {saved ? '✅ Saved!' : '💾 Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Content area */}
        <div style={styles.content}>

          {/* Editor panel */}
          <div style={{ ...styles.editorPanel, width: showPreview ? '50%' : '100%' }}>
            {/* Viewer notice */}
            {!isAdmin && (
              <div style={styles.viewerNotice}>
                ⚠️ You have <strong>view-only</strong> access. Fields cannot be edited.
              </div>
            )}

            <div style={{ pointerEvents: isAdmin ? 'auto' : 'none', opacity: isAdmin ? 1 : 0.65 }}>
              {editorMap[activeSection]}
            </div>
          </div>

          {/* Preview panel */}
          {showPreview && (
            <div style={styles.previewPanel}>
              <div style={styles.previewLabel}>
                ⚡ Live Resume Preview — updates as you type
              </div>
              <ResumePreview data={data} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    height: '100vh',
    background: '#f1f5f9',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflow: 'hidden',
  },
  topbar: {
    background: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 24px',
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  topbarTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 700,
    color: '#1e293b',
  },
  topbarSub: {
    margin: 0,
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  topbarActions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  previewBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1.5px solid',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 20px',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'inherit',
    boxShadow: '0 2px 10px rgba(99,102,241,0.3)',
    transition: 'background 0.2s',
  },
  content: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    minHeight: 0,
  },
  editorPanel: {
    padding: '24px',
    overflowY: 'auto',
    transition: 'width 0.3s ease',
    borderRight: '1px solid #e2e8f0',
  },
  previewPanel: {
    width: '50%',
    overflowY: 'auto',
    background: '#e8ecf0',
    padding: '20px',
  },
  previewLabel: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#64748b',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    marginBottom: '14px',
  },
  viewerNotice: {
    background: '#fffbeb',
    border: '1px solid #fcd34d',
    borderRadius: '10px',
    padding: '10px 16px',
    marginBottom: '20px',
    fontSize: '13px',
    color: '#92400e',
  },
};