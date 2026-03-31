import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Users, FileText, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const { username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.2s',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="glass" style={{ width: '280px', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderRadius: 0, borderRight: '1px solid var(--border)' }}>
        <div style={{ paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>HR Portal</h2>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Welcome, <span style={{fontWeight: 600, color: 'var(--text-primary)'}}>{username}</span></p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
          <NavLink to="/employees" style={navLinkStyle}>
            <Users size={20} />
            Employee Directory
          </NavLink>
          <NavLink to="/reports" style={navLinkStyle}>
            <FileText size={20} />
            Reports
          </NavLink>
        </nav>

        <button 
          onClick={handleLogout}
          style={{ ...navLinkStyle({isActive:false}), border: 'none', width: '100%', cursor: 'pointer', justifyContent: 'flex-start', color: 'var(--danger)' }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '2rem', height: '100vh', overflowY: 'auto' }}>
        <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
