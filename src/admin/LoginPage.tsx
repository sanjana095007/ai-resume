import { useState } from 'react';

interface Props {
  onLogin: (user: { username: string; role: 'admin' | 'viewer'; name: string }) => void;
}

const USERS: Record<string, { password: string; role: 'admin' | 'viewer'; name: string }> = {
  admin:  { password: 'admin123', role: 'admin',  name: 'Chaitanya (Admin)' },
  viewer: { password: 'view123',  role: 'viewer', name: 'Guest Viewer' },
};

export default function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const user = USERS[username];
      if (user && user.password === password) {
        onLogin({ username, role: user.role, name: user.name });
      } else {
        setError('Invalid username or password. Check the demo credentials below.');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={{ ...styles.blob, width: 400, height: 400, top: '-100px', right: '-100px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
      <div style={{ ...styles.blob, width: 300, height: 300, bottom: '-50px', left: '-80px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoBox}>
          <div style={styles.logoIcon}>🔐</div>
          <h1 style={styles.title}>Resume Dashboard</h1>
          <p style={styles.subtitle}>Sign in to manage your resume content</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Username */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>👤</span>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                style={styles.input}
                onFocus={e => (e.target.style.borderColor = '#6366f1')}
                onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔑</span>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{ ...styles.input, paddingRight: '44px' }}
                onFocus={e => (e.target.style.borderColor = '#6366f1')}
                onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={styles.eyeBtn}
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '⏳ Signing in...' : '🚀 Sign In'}
          </button>
        </form>

        {/* Demo credentials hint */}
        <div style={styles.hint}>
          <p style={styles.hintTitle}>🧪 Demo Credentials</p>
          <div style={styles.hintRow}>
            <span style={styles.hintBadge}>Admin</span>
            <code style={styles.hintCode}>username: admin &nbsp;|&nbsp; password: admin123</code>
          </div>
          <div style={styles.hintRow}>
            <span style={{ ...styles.hintBadge, background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }}>Viewer</span>
            <code style={styles.hintCode}>username: viewer &nbsp;|&nbsp; password: view123</code>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  card: {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '24px',
    padding: '40px 36px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
    position: 'relative',
    zIndex: 1,
  },
  logoBox: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoIcon: {
    fontSize: '40px',
    marginBottom: '12px',
    display: 'block',
  },
  title: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 800,
    margin: '0 0 6px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  fieldGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '7px',
    letterSpacing: '0.3px',
  },
  inputWrap: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '13px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '15px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '11px 14px 11px 40px',
    background: 'rgba(255,255,255,0.08)',
    border: '1.5px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    lineHeight: 1,
  },
  errorBox: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#fca5a5',
    fontSize: '13px',
    marginBottom: '16px',
  },
  submitBtn: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    border: 'none',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '4px',
    boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
    fontFamily: 'inherit',
    transition: 'opacity 0.2s',
  },
  hint: {
    marginTop: '24px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '14px 16px',
  },
  hintTitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '12px',
    fontWeight: 700,
    margin: '0 0 10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  hintRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '6px',
  },
  hintBadge: {
    background: 'rgba(99,102,241,0.25)',
    color: '#a5b4fc',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
  },
  hintCode: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '12px',
    fontFamily: 'monospace',
  },
};
