import { Field, Grid2, Card, AddButton } from './shared';
import type { ResumeData } from '../types';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ProjectsEditor({ data, onChange }: Props) {
  const items = data.projects;

  const add = () =>
    onChange({
      ...data,
      projects: [
        ...items,
        { id: Date.now(), name: '', tech: '', period: '', link: '', description: '' },
      ],
    });

  const remove = (id: number) =>
    onChange({ ...data, projects: items.filter(p => p.id !== id) });

  const update = (id: number, key: string, val: string) =>
    onChange({ ...data, projects: items.map(p => p.id === id ? { ...p, [key]: val } : p) });

  return (
    <div>
      {items.map(proj => (
        <Card
          key={proj.id}
          title={proj.name || 'New Project'}
          subtitle={proj.tech}
          onDelete={() => remove(proj.id)}
        >
          <Grid2>
            <Field label="Project Name" value={proj.name}   onChange={v => update(proj.id, 'name',   v)} placeholder="My Awesome Project" />
            <Field label="Year / Period" value={proj.period} onChange={v => update(proj.id, 'period', v)} placeholder="2024" />
          </Grid2>
          <Field label="Tech Stack"   value={proj.tech}   onChange={v => update(proj.id, 'tech',   v)} placeholder="React, Node.js, MongoDB" />
          <Field label="Project Link" value={proj.link}   onChange={v => update(proj.id, 'link',   v)} placeholder="https://github.com/you/project" />
          <Field
            label="Description"
            value={proj.description}
            onChange={v => update(proj.id, 'description', v)}
            multiline
            placeholder="What does this project do? What problem does it solve?"
          />
        </Card>
      ))}

      <AddButton onClick={add}>+ Add Project</AddButton>
    </div>
  );
}