import { Field, Grid2, Card, AddButton, labelStyle } from './shared';
import type { ResumeData } from '../types';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ExperienceEditor({ data, onChange }: Props) {
  const items = data.experience;

  const add = () =>
    onChange({
      ...data,
      experience: [
        ...items,
        { id: Date.now(), company: '', role: '', period: '', location: '', description: '', highlights: [] },
      ],
    });

  const remove = (id: number) =>
    onChange({ ...data, experience: items.filter(e => e.id !== id) });

  const update = (id: number, key: string, val: string) =>
    onChange({ ...data, experience: items.map(e => e.id === id ? { ...e, [key]: val } : e) });

  const updateHighlight = (id: number, hi: number, val: string) =>
    onChange({
      ...data,
      experience: items.map(e =>
        e.id === id ? { ...e, highlights: e.highlights.map((h, i) => (i === hi ? val : h)) } : e
      ),
    });

  const addHighlight = (id: number) =>
    onChange({
      ...data,
      experience: items.map(e =>
        e.id === id ? { ...e, highlights: [...e.highlights, ''] } : e
      ),
    });

  const removeHighlight = (id: number, hi: number) =>
    onChange({
      ...data,
      experience: items.map(e =>
        e.id === id ? { ...e, highlights: e.highlights.filter((_, i) => i !== hi) } : e
      ),
    });

  return (
    <div>
      {items.map(exp => (
        <Card
          key={exp.id}
          title={exp.company || 'New Company'}
          subtitle={exp.role}
          onDelete={() => remove(exp.id)}
        >
          <Grid2>
            <Field label="Company Name" value={exp.company}  onChange={v => update(exp.id, 'company',  v)} placeholder="Company Inc." />
            <Field label="Job Role"     value={exp.role}     onChange={v => update(exp.id, 'role',     v)} placeholder="Software Engineer" />
            <Field label="Period"       value={exp.period}   onChange={v => update(exp.id, 'period',   v)} placeholder="Jan 2022 – Present" />
            <Field label="Location"     value={exp.location} onChange={v => update(exp.id, 'location', v)} placeholder="City, Country" />
          </Grid2>
          <Field
            label="Description"
            value={exp.description}
            onChange={v => update(exp.id, 'description', v)}
            multiline
            placeholder="Briefly describe your role and responsibilities..."
          />

          {/* Highlights / bullet points */}
          <label style={{ ...labelStyle, marginBottom: '8px', display: 'block' }}>
            Key Highlights / Achievements
          </label>
          {exp.highlights.map((h, hi) => (
            <div key={hi} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: '#6366f1', fontSize: '18px', lineHeight: '32px', flexShrink: 0 }}>•</span>
              <input
                value={h}
                onChange={e => updateHighlight(exp.id, hi, e.target.value)}
                placeholder={`Achievement ${hi + 1}`}
                style={{
                  flex: 1, padding: '7px 10px',
                  background: '#f8fafc', border: '1.5px solid #e2e8f0',
                  borderRadius: '7px', fontSize: '13px', color: '#1e293b',
                  outline: 'none', fontFamily: 'inherit',
                }}
                onFocus={e => (e.target.style.borderColor = '#6366f1')}
                onBlur={e  => (e.target.style.borderColor = '#e2e8f0')}
              />
              <button
                onClick={() => removeHighlight(exp.id, hi)}
                style={{
                  background: '#fef2f2', border: '1px solid #fecaca',
                  borderRadius: '7px', padding: '0 10px', cursor: 'pointer',
                  color: '#ef4444', fontSize: '14px', fontFamily: 'inherit',
                }}
              >✕</button>
            </div>
          ))}
          <button
            onClick={() => addHighlight(exp.id)}
            style={{
              background: '#f0fdf4', border: '1px solid #86efac',
              borderRadius: '7px', padding: '6px 14px', cursor: 'pointer',
              color: '#16a34a', fontSize: '12px', fontWeight: 600,
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '5px',
            }}
          >
            + Add Highlight
          </button>
        </Card>
      ))}

      <AddButton onClick={add}>+ Add Work Experience</AddButton>
    </div>
  );
}