import React from 'react';
import { Field, Grid2, AddButton } from './shared';
import type { ResumeData } from '../types';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function CertificationsEditor({ data, onChange }: Props) {
  const items = data.certifications;

  const add = () =>
    onChange({
      ...data,
      certifications: [
        ...items,
        { id: Date.now(), name: '', issuer: '', year: '', credentialId: '' },
      ],
    });

  const remove = (id: number) =>
    onChange({ ...data, certifications: items.filter(c => c.id !== id) });

  const update = (id: number, key: string, val: string) =>
    onChange({ ...data, certifications: items.map(c => c.id === id ? { ...c, [key]: val } : c) });

  return (
    <div>
      {items.map(cert => (
        <div key={cert.id} style={styles.card}>
          {/* Card header */}
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardTitle}>{cert.name || 'New Certification'}</div>
              {cert.issuer && <div style={styles.cardSub}>{cert.issuer} · {cert.year}</div>}
            </div>
            <button onClick={() => remove(cert.id)} style={styles.deleteBtn} title="Remove">🗑</button>
          </div>

          {/* Fields */}
          <div style={styles.cardBody}>
            <Grid2>
              <Field label="Certification Name" value={cert.name}         onChange={v => update(cert.id, 'name',         v)} placeholder="AWS Solutions Architect" />
              <Field label="Issuing Body"        value={cert.issuer}       onChange={v => update(cert.id, 'issuer',       v)} placeholder="Amazon Web Services" />
              <Field label="Year"                value={cert.year}         onChange={v => update(cert.id, 'year',         v)} placeholder="2023" />
              <Field label="Credential ID"       value={cert.credentialId} onChange={v => update(cert.id, 'credentialId', v)} placeholder="ABC-DEF-123" />
            </Grid2>
          </div>
        </div>
      ))}

      <AddButton onClick={add}>+ Add Certification</AddButton>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    marginBottom: '12px',
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '12px 14px',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: '13px',
    color: '#1e293b',
  },
  cardSub: {
    fontSize: '11px',
    color: '#6366f1',
    marginTop: '2px',
  },
  deleteBtn: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'inherit',
  },
  cardBody: {
    padding: '16px',
  },
};