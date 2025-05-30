import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { StarIcon, HomeIcon, PlusIcon, UserIcon, LoginIcon, LogoutIcon } from './Icons';

const Header = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo and Company Name */}
          <Link to="/" className="header-logo">
            <StarIcon size={32} className="logo-icon" />
            <h1 className="company-name">nova's Complaint Manager</h1>
          </Link>

          {/* Navigation */}
          <nav className="header-nav">
            <div className="nav-links">
              <Link to="/" className="nav-link">
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>
              <Link to="/submit" className="nav-link">
                <PlusIcon size={16} />
                <span>Submit Complaint</span>
              </Link>
              {isAuthenticated && isAdmin && (
                <Link to="/admin" className="nav-link">
                  <UserIcon size={16} />
                  <span>Admin</span>
                </Link>
              )}
            </div>

            <div className="auth-section">
              {!isAuthenticated ? (
                <Link to="/login" className="nav-link auth-link">
                  <LoginIcon size={16} />
                  <span>Login</span>
                </Link>
              ) : (
                <div className="user-menu">
                  <span className="welcome-text">Welcome, {user?.username}!</span>
                  <button onClick={handleLogout} className="nav-link auth-link">
                    <LogoutIcon size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
