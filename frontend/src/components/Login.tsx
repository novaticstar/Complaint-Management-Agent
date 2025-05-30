import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HomeIcon, LoginIcon } from './Icons';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const success = await login(credentials.username, credentials.password);
    
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
    
    setLoading(false);
  };
  return (
    <div className="main-content">
      <div className="container">
        <div className="grid">
          <div className="grid-item grid-item-md-6 grid-item-md-offset-3 grid-item-lg-4 grid-item-lg-offset-4">
            <div className="card">
              <div className="card-header">
                <div className="flex items-center gap-2">
                  <LoginIcon className="icon icon-24" />
                  <h1 className="heading-2 margin-0">Admin Login</h1>
                </div>
              </div>
              
              <div className="card-content">
                {error && (
                  <div className="alert alert-error margin-bottom-4">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      className="form-input"
                      required
                      autoComplete="username"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="form-input"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn btn-primary btn-block"
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="card-footer">                <Link to="/" className="btn btn-outline btn-block">
                  <HomeIcon className="icon icon-16" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
