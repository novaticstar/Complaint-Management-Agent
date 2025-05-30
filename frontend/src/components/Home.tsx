import { Link } from 'react-router-dom';
import { PlusIcon, UserIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="page-container">
      <div className="card card-elevated">
        <div className="card-header text-center">
          <h1 className="card-title">Welcome to nova's Complaint Manager</h1>
          <p className="card-subtitle">
            Submit your complaints and track their progress through our streamlined system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Submit a Complaint</h3>
            <p className="mb-6 text-neutral-600">
              Have an issue you'd like to report? Submit your complaint and we'll track it through resolution.
            </p>
            <Link to="/submit" className="btn btn-primary btn-lg w-full">
              <PlusIcon size={16} />
              Submit a Complaint
            </Link>
          </div>

          {isAuthenticated && isAdmin && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Admin Dashboard</h3>
              <p className="mb-6 text-neutral-600">
                View and manage all complaints, update their status, and monitor system activity.
              </p>
              <Link to="/admin" className="btn btn-secondary btn-lg w-full">
                <UserIcon size={16} />
                Admin Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
