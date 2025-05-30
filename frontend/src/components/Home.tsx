import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div>
      <h1>Welcome to Nova Complaint Management</h1>
      <p>Submit your complaints and track their progress.</p>
      <Link to="/submit">
        <button>Submit a Complaint</button>
      </Link>
      <br />
      {isAuthenticated && isAdmin ? (
        <Link to="/admin">
          <button>View Admin Dashboard</button>
        </Link>
      ) : (
        <Link to="/login">
          <button>Admin Login</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
