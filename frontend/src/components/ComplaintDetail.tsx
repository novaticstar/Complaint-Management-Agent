import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchComplaints, updateComplaintStatus, deleteComplaint } from '../utils/api';
import type { Complaint } from '../types';
import { 
  CheckIcon, 
  TrashIcon,
  AlertTriangleIcon,
  LoaderIcon,
  ArrowLeftIcon
} from './Icons';

const ComplaintDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComplaint = async () => {
      if (!id) {
        setError('Invalid complaint ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const complaints = await fetchComplaints();
        const foundComplaint = complaints.find((c: Complaint) => c.id === id);
        
        if (!foundComplaint) {
          setError('Complaint not found');
        } else {
          setComplaint(foundComplaint);
        }
      } catch (err) {
        console.error('Failed to fetch complaint:', err);
        setError('Failed to load complaint. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadComplaint();
  }, [id]);

  const handleResolve = async () => {
    if (!complaint) return;
    
    try {
      await updateComplaintStatus(complaint.id, 'Resolved');
      setComplaint({ ...complaint, status: 'Resolved' });
    } catch (err) {
      console.error('Failed to resolve complaint:', err);
      alert('Failed to resolve complaint. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!complaint) return;
    
    if (confirm('Are you sure you want to delete this complaint?')) {
      try {
        await deleteComplaint(complaint.id);
        navigate('/admin');
      } catch (err) {
        console.error('Failed to delete complaint:', err);
        alert('Failed to delete complaint. Please try again.');
      }
    }
  };

  const handleGoBack = () => {
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="flex items-center justify-center padding-8">
            <div className="flex items-center gap-2">
              <LoaderIcon className="icon icon-24 animate-spin" />
              <span className="text-lg">Loading complaint...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="card">
            <div className="card-content">
              <div className="flex items-center gap-2 text-error">
                <AlertTriangleIcon className="icon icon-24" />
                <span className="text-lg">{error || 'Complaint not found'}</span>
              </div>
              <button 
                onClick={handleGoBack}
                className="btn btn-outline margin-top-4"
              >
                <ArrowLeftIcon className="icon icon-16" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="main-content">
      <div className="container complaint-detail-container">
        {/* Header */}
        <div className="card margin-bottom-6">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleGoBack}
                  className="btn btn-outline btn-sm"
                  title="Back to dashboard"
                >
                  <ArrowLeftIcon className="icon icon-16" />
                  Back
                </button>
                <h1 className="heading-2 margin-0">Complaint Details</h1>
              </div>
              <div className="flex gap-2">
                {complaint.status === 'Pending' && (
                  <button 
                    onClick={handleResolve}
                    className="btn btn-success" 
                    title="Mark as resolved"
                  >
                    <CheckIcon className="icon icon-16" />
                    Mark as Resolved
                  </button>
                )}
                <button 
                  onClick={handleDelete}
                  className="btn btn-error"
                  title="Delete complaint"
                >
                  <TrashIcon className="icon icon-16" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Complaint Details */}
        <div className="card">
          <div className="card-content">
            <div className="grid grid-cols-1 gap-6">
              {/* Basic Information */}
              <div className="complaint-section">
                <h2 className="heading-3 margin-bottom-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Name:</label>
                    <p className="text-base">{complaint.name}</p>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email:</label>
                    <p className="text-base">{complaint.email}</p>
                  </div>
                </div>
              </div>

              {/* Status and Date */}
              <div className="complaint-section">
                <h2 className="heading-3 margin-bottom-4">Status Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Status:</label>
                    <span className={`status-badge ${
                      complaint.status === 'Pending' ? 'status-pending' : 'status-resolved'
                    }`}>
                      {complaint.status}
                    </span>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Date Submitted:</label>
                    <p className="text-base">
                      {new Date(complaint.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Complaint Text */}
              <div className="complaint-section">
                <h2 className="heading-3 margin-bottom-4">Complaint Description</h2>
                <div className="complaint-text">
                  <p className="text-base">{complaint.complaint}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
