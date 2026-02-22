import { Field, Grid2 } from './shared';
import type { ResumeData } from '../types';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ProfileEditor({ data, onChange }: Props) {
  const p = data.profile;
  const set = (key: keyof typeof p) => (val: string) =>
    onChange({ ...data, profile: { ...p, [key]: val } });

  return (
    <div>
      <SectionHeading emoji="👤" title="Basic Info" />
      <Grid2>
        <Field label="Full Name"       value={p.name}     onChange={set('name')}     placeholder="Your full name" />
        <Field label="Title / Tagline" value={p.title}    onChange={set('title')}    placeholder="e.g. Full Stack Developer" />
      </Grid2>

      <SectionHeading emoji="📬" title="Contact" />
      <Grid2>
        <Field label="Email"    value={p.email}    onChange={set('email')}    type="email" placeholder="you@email.com" />
        <Field label="Phone"    value={p.phone}    onChange={set('phone')}    placeholder="+91 00000 00000" />
        <Field label="Location" value={p.location} onChange={set('location')} placeholder="City, Country" />
        <Field label="Website"  value={p.website}  onChange={set('website')}  placeholder="https://yoursite.com" />
      </Grid2>

      <SectionHeading emoji="🔗" title="Social Links" />
      <Grid2>
        <Field label="LinkedIn URL" value={p.linkedin} onChange={set('linkedin')} placeholder="https://linkedin.com/in/..." />
        <Field label="GitHub URL"   value={p.github}   onChange={set('github')}   placeholder="https://github.com/..." />
        <Field label="Twitter / X"  value={p.twitter}  onChange={set('twitter')}  placeholder="https://x.com/..." />
      </Grid2>

      <SectionHeading emoji="📝" title="Professional Summary" />
      <Field
        label="Summary"
        value={p.summary}
        onChange={set('summary')}
        multiline
        placeholder="Write a short professional bio about yourself..."
      />
    </div>
  );
}

function SectionHeading({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      fontSize: '13px', fontWeight: 700, color: '#374151',
      margin: '20px 0 10px', paddingBottom: '8px',
      borderBottom: '1.5px solid #e0e7ff',
    }}>
      {emoji} {title}
    </div>
  );
}