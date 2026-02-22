import { Field, Grid2, Card, AddButton } from './shared';
import type { ResumeData } from '../types';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function EducationEditor({ data, onChange }: Props) {
  const items = data.education;

  const add = () =>
    onChange({
      ...data,
      education: [
        ...items,
        { id: Date.now(), institution: '', degree: '', period: '', location: '', gpa: '', description: '' },
      ],
    });

  const remove = (id: number) =>
    onChange({ ...data, education: items.filter(e => e.id !== id) });

  const update = (id: number, key: string, val: string) =>
    onChange({ ...data, education: items.map(e => e.id === id ? { ...e, [key]: val } : e) });

  return (
    <div>
      {items.map(edu => (
        <Card
          key={edu.id}
          title={edu.institution || 'New Institution'}
          subtitle={edu.degree}
          onDelete={() => remove(edu.id)}
        >
          <Grid2>
            <Field label="Institution"    value={edu.institution} onChange={v => update(edu.id, 'institution', v)} placeholder="University Name" />
            <Field label="Degree"         value={edu.degree}      onChange={v => update(edu.id, 'degree',      v)} placeholder="B.Tech in Computer Science" />
            <Field label="Period"         value={edu.period}      onChange={v => update(edu.id, 'period',      v)} placeholder="2017 – 2021" />
            <Field label="Location"       value={edu.location}    onChange={v => update(edu.id, 'location',    v)} placeholder="City, Country" />
            <Field label="GPA / Grade"    value={edu.gpa}         onChange={v => update(edu.id, 'gpa',         v)} placeholder="8.5 / 10.0" />
          </Grid2>
          <Field
            label="Description / Achievements"
            value={edu.description}
            onChange={v => update(edu.id, 'description', v)}
            multiline
            placeholder="Notable achievements, projects, or relevant coursework..."
          />
        </Card>
      ))}

      <AddButton onClick={add}>+ Add Education</AddButton>
    </div>
  );
}