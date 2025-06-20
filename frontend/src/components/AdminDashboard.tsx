import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchComplaints, deleteComplaint, updateComplaintStatus } from '../utils/api';
import type { Complaint } from '../types';
import { 
  UserIcon, 
  CheckIcon, 
  TrashIcon,
  AlertTriangleIcon,
  LoaderIcon,
  EyeIcon
} from './Icons';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  // Function to truncate text with ellipsis
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Handle viewing complaint - navigate to detail page
  const handleViewComplaint = (id: string) => {
    navigate(`/admin/complaint/${id}`);
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
      <div className="main-content">
        <div className="container">
          <div className="flex items-center justify-center padding-8">
            <div className="flex items-center gap-2">
              <LoaderIcon className="icon icon-24 animate-spin" />
              <span className="text-lg">Loading complaints...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="main-content">
      <div className="container">
        <div className="grid margin-bottom-6">
          <div className="grid-item grid-item-12">
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserIcon className="icon icon-24" />
                    <h1 className="heading-2 margin-0">Admin Dashboard</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="alert alert-error margin-bottom-6">
            <AlertTriangleIcon className="icon icon-16" />
            {error}
          </div>
        )}
        
        <div className="card">
          <div className="card-header">
            <h2 className="heading-3 margin-0">Complaints ({complaints.length})</h2>
          </div>
          
          <div className="card-content">
            {complaints.length === 0 ? (
              <div className="text-center padding-8">
                <p className="text-lg text-neutral-600">No complaints found.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Complaint</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (                      <tr key={complaint.id}>
                        <td className="max-width-150">
                          <span title={complaint.name}>
                            {truncateText(complaint.name, 20)}
                          </span>
                        </td>
                        <td className="max-width-200">
                          <span title={complaint.email}>
                            {truncateText(complaint.email, 25)}
                          </span>
                        </td>
                        <td className="max-width-300">
                          <span title={complaint.complaint}>
                            {truncateText(complaint.complaint, 50)}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${
                            complaint.status === 'Pending' ? 'status-pending' : 'status-resolved'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td>{new Date(complaint.created_at).toLocaleDateString()}</td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleViewComplaint(complaint.id)}
                              className="btn btn-outline btn-sm" 
                              title="View full complaint"
                            >
                              <EyeIcon className="icon icon-16" />
                              View
                            </button>
                            {complaint.status === 'Pending' && (
                              <button 
                                onClick={() => handleResolve(complaint.id)}
                                className="btn btn-success btn-sm" 
                                title="Mark as resolved"
                              >
                                <CheckIcon className="icon icon-16" />
                                Resolve
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(complaint.id)}
                              className="btn btn-error btn-sm"
                              title="Delete complaint"
                            >
                              <TrashIcon className="icon icon-16" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
