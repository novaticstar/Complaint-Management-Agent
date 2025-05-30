import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createComplaint } from '../utils/api';
import type { CreateComplaintRequest } from '../types';
import { HomeIcon, PlusIcon, CheckIcon } from './Icons';

const ComplaintForm = () => {
  const [formData, setFormData] = useState<CreateComplaintRequest>({
    name: '',
    email: '',
    complaint: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.complaint.trim()) {
      setMessage('Please fill in all fields.');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

    try {
      await createComplaint(formData);
      setMessage('Complaint submitted successfully!');
      setFormData({ name: '', email: '', complaint: '' });
    } catch (error) {
      setMessage('Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };  return (
    <div className="main-content">
      <div className="container">
        <div className="grid">
          <div className="grid-item grid-item-md-8 grid-item-md-offset-2 grid-item-lg-6 grid-item-lg-offset-3">
            <div className="card">
              <div className="card-header">                <div className="flex items-center gap-2">
                  <PlusIcon className="icon icon-24" />
                  <h1 className="heading-2 margin-0">Submit a Complaint</h1>
                </div>
              </div>
              
              <div className="card-content">
                {message && (
                  <div className={`alert margin-bottom-4 ${
                    message.includes('successfully') ? 'alert-success' : 'alert-error'
                  }`}>                    {message.includes('successfully') && (
                      <CheckIcon className="icon icon-16" />
                    )}
                    {message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your email address"
                      required
                      autoComplete="email"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="complaint" className="form-label">Complaint</label>
                    <textarea 
                      id="complaint"
                      name="complaint"
                      value={formData.complaint}
                      onChange={handleChange}
                      rows={6}
                      className="form-textarea"
                      placeholder="Describe your complaint in detail..."
                      required
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn btn-primary btn-md"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;