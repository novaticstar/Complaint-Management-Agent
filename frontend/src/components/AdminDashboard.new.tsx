import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchComplaints, updateComplaintStatus, deleteComplaint } from '../utils/api';
import type { Complaint } from '../types';

const AdminDashboard = () => {
  console.log('AdminDashboard component rendering...');
  
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('useEffect triggered');
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    console.log('loadComplaints function called');
    try {
      setLoading(true);
      console.log('About to fetch complaints...');
      const data = await fetchComplaints();
      console.log('Complaints fetched successfully:', data);
      setComplaints(data);
      setError('');
    } catch (err) {
      console.error('Error loading complaints:', err);
      setError('Failed to load complaints: ' + (err instanceof Error ? err.message : 'Unknown error'));
      // Show sample data if API fails
      console.log('Setting sample data...');
      setComplaints([
        {
          id: '1',
          name: 'Sample User',
          email: 'user@example.com',
          complaint: 'This is a sample complaint for testing purposes.',
          status: 'Pending' as const,
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await updateComplaintStatus(id, 'Resolved');
      setComplaints(prev => 
        prev.map(complaint => 
          complaint.id === id 
            ? { ...complaint, status: 'Resolved' as const }
            : complaint
        )
      );
    } catch (err) {
      setError('Failed to resolve complaint');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComplaint(id);
      setComplaints(prev => prev.filter(complaint => complaint.id !== id));
    } catch (err) {
      setError('Failed to delete complaint');
    }
  };

  console.log('About to render. Loading:', loading, 'Error:', error, 'Complaints:', complaints);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      <p>Manage complaints here.</p>
      
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <p style={{ color: 'orange' }}>Showing sample data for testing...</p>
        </div>
      )}
      
      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div>
          <p>Found {complaints.length} complaint(s):</p>
          <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '5px' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '5px' }}>Email</th>
                <th style={{ border: '1px solid black', padding: '5px' }}>Complaint</th>
                <th style={{ border: '1px solid black', padding: '5px' }}>Status</th>
                <th style={{ border: '1px solid black', padding: '5px' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '5px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{complaint.name}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{complaint.email}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{complaint.complaint}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{complaint.status}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{new Date(complaint.created_at).toLocaleDateString()}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>
                    {complaint.status === 'Pending' && (
                      <button onClick={() => handleResolve(complaint.id)}>
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
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
