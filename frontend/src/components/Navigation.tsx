import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HomeIcon, PlusIcon, UserIcon, LoginIcon, LogoutIcon } from './Icons';

const Navigation = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav-link">
        <HomeIcon size={16} />
        Home
      </Link>
      <Link to="/submit" className="nav-link">
        <PlusIcon size={16} />
        Submit Complaint
      </Link>
      {isAuthenticated && isAdmin && (
        <Link to="/admin" className="nav-link">
          <UserIcon size={16} />
          Admin Dashboard
        </Link>
      )}
      {!isAuthenticated ? (
        <Link to="/login" className="nav-link">
          <LoginIcon size={16} />
          Admin Login
        </Link>
      ) : (
        <div className="nav" style={{ marginLeft: 'auto' }}>
          <span className="text-sm">
            Welcome, <strong>{user?.username}</strong>!
          </span>
          <button onClick={handleLogout} className="btn btn-sm btn-outline">
            <LogoutIcon size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;