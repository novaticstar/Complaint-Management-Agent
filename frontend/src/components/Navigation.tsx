import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/submit">Submit Complaint</Link>
      {isAuthenticated && isAdmin && (
        <>
          {' | '}
          <Link to="/admin">Admin Dashboard</Link>
        </>
      )}
      {!isAuthenticated ? (
        <>
          {' | '}
          <Link to="/login">Admin Login</Link>
        </>
      ) : (
        <>
          {' | '}
          <span>Welcome, {user?.username}!</span>
          {' | '}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navigation;