import { useState } from 'react';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

interface User {
  username: string;
  role: 'admin' | 'viewer';
  name: string;
}

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}
