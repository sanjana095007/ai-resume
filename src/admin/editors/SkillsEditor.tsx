import { AddButton, labelStyle } from './shared';
import type { ResumeData } from '../types';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function SkillsEditor({ data, onChange }: Props) {
  const skills = data.skills;

  const add = () =>
    onChange({
      ...data,
      skills: [...skills, { id: Date.now(), category: 'New Category', name: 'New Skill', level: 80 }],
    });

  const remove = (id: number) =>
    onChange({ ...data, skills: skills.filter(s => s.id !== id) });

  const update = (id: number, key: string, val: string | number) =>
    onChange({ ...data, skills: skills.map(s => s.id === id ? { ...s, [key]: val } : s) });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '7px 10px',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '7px',
    fontSize: '13px',
    color: '#1e293b',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  return (
    <div>
      <div style={{ marginBottom: '14px', color: '#64748b', fontSize: '13px' }}>
        Add your skills grouped by category. Drag the slider to set proficiency level.
      </div>

      {skills.map(skill => (
        <div key={skill.id} style={styles.skillCard}>
          {/* Row 1: inputs */}
          <div style={styles.skillRow}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Category</label>
              <input
                value={skill.category}
                onChange={e => update(skill.id, 'category', e.target.value)}
                placeholder="e.g. Frontend"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#6366f1')}
                onBlur={e  => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>
            <div style={{ flex: 2 }}>
              <label style={labelStyle}>Skill Name</label>
              <input
                value={skill.name}
                onChange={e => update(skill.id, 'name', e.target.value)}
                placeholder="e.g. React / TypeScript"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#6366f1')}
                onBlur={e  => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>
            <div style={{ width: '70px' }}>
              <label style={labelStyle}>Level %</label>
              <input
                type="number"
                min={1} max={100}
                value={skill.level}
                onChange={e => update(skill.id, 'level', parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
            <button onClick={() => remove(skill.id)} style={styles.deleteBtn} title="Remove">🗑</button>
          </div>

          {/* Row 2: slider + bar */}
          <div style={{ marginTop: '8px' }}>
            <input
              type="range" min={1} max={100}
              value={skill.level}
              onChange={e => update(skill.id, 'level', parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#6366f1', cursor: 'pointer' }}
            />
            <div style={styles.barBg}>
              <div style={{ ...styles.barFill, width: `${skill.level}%` }} />
            </div>
          </div>
        </div>
      ))}

      <AddButton onClick={add}>+ Add Skill</AddButton>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  skillCard: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '14px',
    marginBottom: '10px',
  },
  skillRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
  },
  deleteBtn: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '7px 10px',
    cursor: 'pointer',
    fontSize: '14px',
    flexShrink: 0,
    alignSelf: 'flex-end',
    marginBottom: '0',
    fontFamily: 'inherit',
  },
  barBg: {
    height: '5px',
    background: '#e2e8f0',
    borderRadius: '3px',
    marginTop: '4px',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
};