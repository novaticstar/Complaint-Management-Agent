import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchComplaints, deleteComplaint, updateComplaintStatus } from '../utils/api';
import type { Complaint } from '../types';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogout = () => {
    logout();
  };
  
  // Fetch complaints from the database
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchComplaints();
        setComplaints(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
        setError('Failed to load complaints. Please try again.');
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      await updateComplaintStatus(id, 'Resolved');
      // Refresh the complaints list
      const updatedComplaints = await fetchComplaints();
      setComplaints(Array.isArray(updatedComplaints) ? updatedComplaints : []);
    } catch (err) {
      console.error('Failed to resolve complaint:', err);
      alert('Failed to resolve complaint. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this complaint?')) {
      try {
        await deleteComplaint(id);
        // Refresh the complaints list
        const updatedComplaints = await fetchComplaints();
        setComplaints(Array.isArray(updatedComplaints) ? updatedComplaints : []);
      } catch (err) {
        console.error('Failed to delete complaint:', err);
        alert('Failed to delete complaint. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <p>Loading complaints...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <p>Welcome, {user?.username}! | <button onClick={handleLogout}>Logout</button></p>
      </div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      
      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          <p>{error}</p>
        </div>
      )}
      
      <div>
        <p>Found {complaints.length} complaint(s):</p>
        {complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Email</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Complaint</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Status</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{complaint.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{complaint.email}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{complaint.complaint}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <span style={{ 
                      color: complaint.status === 'Pending' ? 'orange' : 'green',
                      fontWeight: 'bold'
                    }}>
                      {complaint.status}
                    </span>
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {new Date(complaint.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    {complaint.status === 'Pending' && (
                      <button 
                        onClick={() => handleResolve(complaint.id)}
                        style={{ marginRight: '5px' }}
                      >
                        Resolve
                      </button>
                    )}
                    <button onClick={() => handleDelete(complaint.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
