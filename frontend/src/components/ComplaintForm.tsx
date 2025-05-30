import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createComplaint } from '../utils/api';
import type { CreateComplaintRequest } from '../types';

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
  };
  return (
    <div>
      <h1>Submit a Complaint</h1>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="complaint">Complaint:</label>
          <textarea 
            id="complaint"
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;