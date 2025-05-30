import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PlusIcon, UserIcon, LoginIcon } from './Icons';

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="container">
      <div className="main-content">
        <div className="card card-elevated">
          <div className="card-header">
            <h1 className="card-title">Welcome to Nova Complaint Management</h1>
            <p className="card-subtitle">
              Submit your complaints and track their progress through our streamlined system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="card">
              <h3>Submit a Complaint</h3>
              <p className="mb-6">
                Have an issue you'd like to report? Submit your complaint and we'll track it through resolution.
              </p>
              <Link to="/submit" className="btn btn-primary btn-lg">
                <PlusIcon size={16} />
                Submit a Complaint
              </Link>
            </div>

            <div className="card">
              <h3>Admin Access</h3>
              <p className="mb-6">
                {isAuthenticated && isAdmin 
                  ? "Access the administrative dashboard to manage complaints and track system activity."
                  : "Administrative access for complaint management and system oversight."
                }
              </p>
              {isAuthenticated && isAdmin ? (
                <Link to="/admin" className="btn btn-secondary btn-lg">
                  <UserIcon size={16} />
                  View Admin Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn btn-outline btn-lg">
                  <LoginIcon size={16} />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
