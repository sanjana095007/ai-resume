import { ResumeData } from './types';
interface Props {
  data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
  const { profile, skills, experience, education, projects, certifications } = data;
  const skillCategories = [...new Set(skills.map(s => s.category))];

  return (
    <div style={styles.resume}>

      {/* ── Header ── */}
      <div style={styles.header}>
        <h1 style={styles.name}>{profile.name || 'Your Name'}</h1>
        <p style={styles.titleText}>{profile.title || 'Your Title'}</p>
        <div style={styles.contactRow}>
          {profile.email    && <span style={styles.contact}>✉ {profile.email}</span>}
          {profile.phone    && <span style={styles.contact}>📞 {profile.phone}</span>}
          {profile.location && <span style={styles.contact}>📍 {profile.location}</span>}
          {profile.website  && <span style={styles.contact}>🌐 {profile.website}</span>}
        </div>
        <div style={styles.contactRow}>
          {profile.github   && <span style={styles.contact}>GitHub: {profile.github}</span>}
          {profile.linkedin && <span style={styles.contact}>LinkedIn: {profile.linkedin}</span>}
        </div>
      </div>

      {/* ── Body: two columns ── */}
      <div style={styles.body}>

        {/* LEFT COLUMN */}
        <div style={styles.left}>

          {/* Summary */}
          {profile.summary && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>SUMMARY</div>
              <p style={styles.summaryText}>{profile.summary}</p>
            </div>
          )}

          {/* Skills */}
          {skillCategories.map(cat => (
            <div key={cat} style={styles.section}>
              <div style={styles.sectionTitle}>{cat.toUpperCase()}</div>
              {skills.filter(s => s.category === cat).map(skill => (
                <div key={skill.id} style={{ marginBottom: '8px' }}>
                  <div style={styles.skillRow}>
                    <span style={styles.skillName}>{skill.name}</span>
                    <span style={styles.skillPct}>{skill.level}%</span>
                  </div>
                  <div style={styles.skillBarBg}>
                    <div style={{ ...styles.skillBarFill, width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>CERTIFICATIONS</div>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '10px' }}>
                  <div style={styles.certName}>{cert.name}</div>
                  <div style={styles.certMeta}>{cert.issuer} · {cert.year}</div>
                  {cert.credentialId && <div style={styles.certId}>ID: {cert.credentialId}</div>}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.right}>

          {/* Experience */}
          {experience.length > 0 && (
            <div style={styles.section}>
              <div style={styles.mainSectionTitle}>Work Experience</div>
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: i < experience.length - 1 ? '20px' : 0 }}>
                  <div style={styles.expHeader}>
                    <div>
                      <div style={styles.expRole}>{exp.role}</div>
                      <div style={styles.expCompany}>{exp.company}</div>
                    </div>
                    <div style={styles.expMeta}>
                      <div>{exp.period}</div>
                      <div>{exp.location}</div>
                    </div>
                  </div>
                  {exp.description && <p style={styles.expDesc}>{exp.description}</p>}
                  {exp.highlights.length > 0 && (
                    <ul style={styles.bulletList}>
                      {exp.highlights.filter(Boolean).map((h, hi) => (
                        <li key={hi} style={styles.bulletItem}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={styles.section}>
              <div style={styles.mainSectionTitle}>Projects</div>
              {projects.map((proj, i) => (
                <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '14px' : 0 }}>
                  <div style={styles.expHeader}>
                    <div style={styles.expRole}>{proj.name}</div>
                    <div style={styles.expMeta}>{proj.period}</div>
                  </div>
                  {proj.tech && <div style={styles.techBadge}>{proj.tech}</div>}
                  {proj.description && <p style={styles.expDesc}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={styles.section}>
              <div style={styles.mainSectionTitle}>Education</div>
              {education.map(edu => (
                <div key={edu.id}>
                  <div style={styles.expHeader}>
                    <div>
                      <div style={styles.expRole}>{edu.degree}</div>
                      <div style={styles.expCompany}>{edu.institution}</div>
                    </div>
                    <div style={styles.expMeta}>
                      <div>{edu.period}</div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                  {edu.description && <p style={styles.expDesc}>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  resume: {
    background: '#ffffff',
    color: '#1e293b',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    fontSize: '12px',
    lineHeight: 1.5,
    boxShadow: '0 4px 30px rgba(0,0,0,0.15)',
    borderRadius: '4px',
    overflow: 'hidden',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    padding: '28px 32px',
    color: '#fff',
  },
  name: {
    margin: '0 0 4px',
    fontSize: '26px',
    fontWeight: 800,
    letterSpacing: '-0.5px',
  },
  titleText: {
    margin: '0 0 14px',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: 500,
  },
  contactRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px 16px',
    marginBottom: '4px',
  },
  contact: {
    color: '#cbd5e1',
    fontSize: '11px',
  },
  body: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
  left: {
    background: '#f8fafc',
    padding: '24px 18px',
    borderRight: '1px solid #e2e8f0',
  },
  right: {
    padding: '24px 26px',
  },
  section: {
    marginBottom: '22px',
  },
  sectionTitle: {
    fontSize: '9px',
    fontWeight: 800,
    color: '#6366f1',
    letterSpacing: '1.5px',
    marginBottom: '10px',
    paddingBottom: '4px',
    borderBottom: '2px solid #e0e7ff',
  },
  mainSectionTitle: {
    fontSize: '14px',
    fontWeight: 800,
    color: '#1e293b',
    marginBottom: '12px',
    paddingBottom: '5px',
    borderBottom: '2.5px solid #6366f1',
  },
  summaryText: {
    color: '#475569',
    fontSize: '11px',
    lineHeight: 1.7,
    margin: 0,
  },
  skillRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '3px',
  },
  skillName: {
    fontSize: '11px',
    color: '#374151',
    fontWeight: 500,
  },
  skillPct: {
    fontSize: '10px',
    color: '#6b7280',
  },
  skillBarBg: {
    height: '4px',
    background: '#e2e8f0',
    borderRadius: '2px',
  },
  skillBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    borderRadius: '2px',
    transition: 'width 0.4s ease',
  },
  certName: {
    fontWeight: 700,
    fontSize: '11px',
    color: '#1e293b',
  },
  certMeta: {
    fontSize: '10px',
    color: '#6b7280',
  },
  certId: {
    fontSize: '10px',
    color: '#9ca3af',
  },
  expHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '5px',
    gap: '8px',
  },
  expRole: {
    fontWeight: 700,
    fontSize: '13px',
    color: '#1e293b',
  },
  expCompany: {
    fontSize: '11px',
    color: '#6366f1',
    fontWeight: 600,
  },
  expMeta: {
    textAlign: 'right',
    fontSize: '10px',
    color: '#6b7280',
    flexShrink: 0,
  },
  expDesc: {
    fontSize: '11px',
    color: '#475569',
    margin: '4px 0 5px',
    lineHeight: 1.6,
  },
  bulletList: {
    margin: '4px 0 0',
    paddingLeft: '16px',
  },
  bulletItem: {
    fontSize: '11px',
    color: '#374151',
    marginBottom: '3px',
  },
  techBadge: {
    fontSize: '10px',
    color: '#6366f1',
    fontWeight: 600,
    marginBottom: '4px',
  },
};
