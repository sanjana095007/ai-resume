interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: { username: string; role: 'admin' | 'viewer'; name: string };
  onLogout: () => void;
}

const SECTIONS = [
  { id: 'profile',         label: 'Profile',         icon: '👤', desc: 'Name, contact, summary' },
  { id: 'skills',          label: 'Skills',           icon: '⚡', desc: 'Tech & soft skills'     },
  { id: 'experience',      label: 'Experience',       icon: '💼', desc: 'Work history'            },
  { id: 'education',       label: 'Education',        icon: '🎓', desc: 'Degrees & courses'       },
  { id: 'projects',        label: 'Projects',         icon: '🚀', desc: 'Portfolio projects'      },
  { id: 'certifications',  label: 'Certifications',   icon: '🏆', desc: 'Certs & awards'          },
];

export default function Sidebar({ activeSection, onSectionChange, user, onLogout }: SidebarProps) {
  const isAdmin = user.role === 'admin';

  return (
    <div style={styles.sidebar}>

      {/* ── Brand ── */}
      <div style={styles.brand}>
        <div style={styles.brandIcon}>📄</div>
        <div>
          <div style={styles.brandTitle}>Resume CMS</div>
          <div style={styles.brandSub}>Content Manager</div>
        </div>
      </div>

      {/* ── Role badge ── */}
      <div style={styles.roleBadge}>
        <span style={{ ...styles.roleDot, background: isAdmin ? '#6366f1' : '#10b981' }} />
        {isAdmin ? '👑 Admin Access' : '👁 View Only'}
      </div>

      {/* ── Nav label ── */}
      <div style={styles.navLabel}>SECTIONS</div>

      {/* ── Nav items ── */}
      <nav style={styles.nav}>
        {SECTIONS.map(section => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              style={{
                ...styles.navBtn,
                background:   isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
                borderLeft:   isActive ? '3px solid #6366f1'     : '3px solid transparent',
                color:        isActive ? '#a5b4fc'               : '#94a3b8',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
                }
              }}
            >
              <span style={styles.navIcon}>{section.icon}</span>
              <div style={styles.navText}>
                <div style={{ fontWeight: isActive ? 700 : 400, fontSize: '13px' }}>{section.label}</div>
                <div style={styles.navDesc}>{section.desc}</div>
              </div>
              {isActive && <span style={styles.activeArrow}>›</span>}
            </button>
          );
        })}
      </nav>

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Help box ── */}
      <div style={styles.helpBox}>
        <div style={styles.helpTitle}>💡 How it works</div>
        <div style={styles.helpText}>
          {isAdmin
            ? 'Edit any field on the right. Toggle preview to see live changes on the resume.'
            : 'You have view-only access. Ask an admin to make changes.'}
        </div>
      </div>

      {/* ── User profile ── */}
      <div style={styles.userSection}>
        <div style={styles.avatar}>{user.name[0].toUpperCase()}</div>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user.name}</div>
          <div style={styles.userRole}>@{user.username}</div>
        </div>
        <button
          onClick={onLogout}
          title="Sign out"
          style={styles.logoutBtn}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.2)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.1)')}
        >
          🚪
        </button>
      </div>

    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: '240px',
    minWidth: '240px',
    height: '100vh',
    background: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
    overflowY: 'auto',
    flexShrink: 0,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '20px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  brandIcon: {
    width: '38px',
    height: '38px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(99,102,241,0.35)',
  },
  brandTitle: {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: 1.2,
  },
  brandSub: {
    color: '#475569',
    fontSize: '11px',
  },
  roleBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    margin: '12px 12px 4px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px',
    padding: '7px 12px',
    color: '#94a3b8',
    fontSize: '12px',
    fontWeight: 500,
  },
  roleDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  navLabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#334155',
    letterSpacing: '1.2px',
    padding: '16px 16px 6px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 8px',
    gap: '2px',
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'all 0.15s',
    fontFamily: 'inherit',
  },
  navIcon: {
    fontSize: '16px',
    flexShrink: 0,
    width: '22px',
    textAlign: 'center',
  },
  navText: {
    flex: 1,
    minWidth: 0,
  },
  navDesc: {
    fontSize: '10px',
    color: '#475569',
    marginTop: '1px',
  },
  activeArrow: {
    color: '#6366f1',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: 1,
  },
  helpBox: {
    margin: '12px',
    background: 'rgba(99,102,241,0.08)',
    border: '1px solid rgba(99,102,241,0.15)',
    borderRadius: '10px',
    padding: '12px',
  },
  helpTitle: {
    color: '#a5b4fc',
    fontSize: '12px',
    fontWeight: 700,
    marginBottom: '5px',
  },
  helpText: {
    color: '#64748b',
    fontSize: '11px',
    lineHeight: 1.5,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 12px',
    borderTop: '1px solid rgba(255,255,255,0.07)',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 700,
    flexShrink: 0,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  userName: {
    color: '#e2e8f0',
    fontSize: '12px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  userRole: {
    color: '#475569',
    fontSize: '11px',
  },
  logoutBtn: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: '7px',
    padding: '5px 8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.15s',
    flexShrink: 0,
  },
};
