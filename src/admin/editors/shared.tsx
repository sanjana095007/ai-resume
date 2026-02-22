import React from 'react';

// ─── Reusable Field ────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
}

export function Field({ label, value, onChange, multiline, type = 'text', placeholder }: FieldProps) {
  const base: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#1e293b',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          style={{ ...base, resize: 'vertical', lineHeight: 1.5 }}
          onFocus={e  => (e.target.style.borderColor = '#6366f1')}
          onBlur={e   => (e.target.style.borderColor = '#e2e8f0')}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
          onFocus={e  => (e.target.style.borderColor = '#6366f1')}
          onBlur={e   => (e.target.style.borderColor = '#e2e8f0')}
        />
      )}
    </div>
  );
}

// ─── Two-column grid wrapper ───────────────────────────────────────────────────
export function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
      {children}
    </div>
  );
}

// ─── Add button ───────────────────────────────────────────────────────────────
export function AddButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '10px',
        border: '2px dashed #c7d2fe',
        borderRadius: '10px',
        background: '#f5f3ff',
        color: '#6366f1',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontFamily: 'inherit',
        marginTop: '8px',
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLButtonElement).style.background = '#eef2ff';
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#818cf8';
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLButtonElement).style.background = '#f5f3ff';
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#c7d2fe';
      }}
    >
      {children}
    </button>
  );
}

// ─── Card with collapsible header ─────────────────────────────────────────────
interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onDelete: () => void;
}

export function Card({ title, subtitle, children, onDelete }: CardProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <div style={cardStyles.card}>
      {/* Header */}
      <div style={cardStyles.header}>
        <div
          style={{ flex: 1, cursor: 'pointer' }}
          onClick={() => setOpen(!open)}
        >
          <div style={cardStyles.headerTitle}>{title || '(untitled)'}</div>
          {subtitle && <div style={cardStyles.headerSub}>{subtitle}</div>}
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            onClick={() => setOpen(!open)}
            style={cardStyles.toggleBtn}
          >
            {open ? '▲' : '▼'}
          </button>
          <button
            onClick={onDelete}
            style={cardStyles.deleteBtn}
            title="Remove this entry"
          >
            🗑
          </button>
        </div>
      </div>

      {/* Body */}
      {open && (
        <div style={cardStyles.body}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────
export const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 600,
  color: '#64748b',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const cardStyles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    marginBottom: '12px',
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    gap: '8px',
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: '13px',
    color: '#1e293b',
  },
  headerSub: {
    fontSize: '11px',
    color: '#6366f1',
    marginTop: '2px',
  },
  toggleBtn: {
    background: 'rgba(99,102,241,0.08)',
    border: '1px solid #e0e7ff',
    borderRadius: '6px',
    padding: '3px 8px',
    cursor: 'pointer',
    fontSize: '10px',
    color: '#6366f1',
    fontFamily: 'inherit',
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
  body: {
    padding: '16px',
  },
};