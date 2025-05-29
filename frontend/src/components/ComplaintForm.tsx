import React, { useState } from 'react';
import { 
  DocumentTextIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { createComplaint } from '../utils/api';
import type { ComplaintFormData } from '../utils/validation';
import { complaintSchema } from '../utils/validation';

interface ComplaintFormProps {
  onSuccess?: () => void;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    name: '',
    email: '',
    complaint: ''
  });
  const [errors, setErrors] = useState<Partial<ComplaintFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    try {
      complaintSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Partial<ComplaintFormData> = {};
      error.errors?.forEach((err: any) => {
        if (err.path) {
          newErrors[err.path[0] as keyof ComplaintFormData] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');    try {
      await createComplaint(formData);
      setSubmitStatus('success');
      setSubmitMessage('Your complaint has been submitted successfully! We will review it shortly.');
      setFormData({ name: '', email: '', complaint: '' });
      setErrors({});
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Failed to submit complaint');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ComplaintFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}        <div className="text-center mb-10">          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <DocumentTextIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Submit Your Complaint
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            We value your feedback and take every concern seriously. Help us improve by sharing your experience.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-8">
            {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-xl animate-fade-in">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircleIcon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-teal-800 font-medium">Success!</p>
                  <p className="text-teal-700 text-sm">{submitMessage}</p>
                </div>
              </div>
            </div>
          )}          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-red-800 font-medium">Error</p>
                  <p className="text-red-700 text-sm">{submitMessage}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                <UserIcon className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
                    errors.name 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-slate-200 focus:border-indigo-500 hover:border-slate-300'
                  }`}
                  placeholder="Enter your full name"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  required
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-red-600 text-sm flex items-center">
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-slate-200 focus:border-indigo-500 hover:border-slate-300'
                  }`}
                  placeholder="Enter your email address"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-600 text-sm flex items-center">
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>            {/* Complaint Field */}
            <div className="space-y-2">
              <label htmlFor="complaint" className="block text-sm font-semibold text-slate-700">
                <DocumentTextIcon className="w-4 h-4 inline mr-2" />
                Complaint Details
              </label>
              <div className="relative">
                <textarea
                  id="complaint"
                  name="complaint"
                  rows={6}
                  value={formData.complaint}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 resize-none ${
                    errors.complaint 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-slate-200 focus:border-indigo-500 hover:border-slate-300'
                  }`}
                  placeholder="Please describe your complaint in detail. Include any relevant information that will help us understand and address your concern."
                  aria-describedby={errors.complaint ? 'complaint-error' : undefined}
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                {errors.complaint ? (
                  <p id="complaint-error" className="text-red-600 text-sm flex items-center">
                    <XMarkIcon className="w-4 h-4 mr-1" />
                    {errors.complaint}
                  </p>
                ) : (
                  <p className="text-slate-500 text-sm">Minimum 10 characters required</p>
                )}
                <p className="text-slate-400 text-sm">{formData.complaint.length}/2000</p>
              </div>
            </div>            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 transform ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed scale-95'
                  : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Submitting...
                </div>
              ) : (              <div className="flex items-center justify-center">
                <PaperAirplaneIcon className="w-4 h-4 mr-3" />
                Submit Complaint
              </div>
              )}
            </button>
          </form>
        </div>        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Your privacy is important to us. All complaints are handled confidentially.
          </p>
        </div>
      </div>
    </div>
  );
};