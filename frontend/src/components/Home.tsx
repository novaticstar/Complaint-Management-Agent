import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SparklesIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { ComplaintForm } from './ComplaintForm';

export const Home: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleComplaintSuccess = () => {
    setShowForm(false);
    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showForm) {
    return <ComplaintForm onSuccess={handleComplaintSuccess} />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-teal-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              nova
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Voice Matters
          </h2>
          
          <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional complaint management system designed to ensure every concern 
            is heard, tracked, and resolved efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
            >
              <DocumentTextIcon className="w-5 h-5" />
              Submit Complaint
              <ArrowRightIcon className="w-4 h-4" />
            </button>
            
            <Link
              to="/admin"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <ChartBarIcon className="w-5 h-5" />
              Admin Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-indigo-200">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">48hrs</div>
              <div className="text-indigo-200">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-indigo-200">Resolution Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Nova Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our streamlined process ensures your complaints are handled with care and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-all duration-200 shadow-lg">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Submit Your Complaint</h3>
              <p className="text-slate-600 leading-relaxed">
                Fill out our simple form with your concern. Provide as much detail as possible 
                to help us understand and address your issue effectively.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-all duration-200 shadow-lg">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">We Review & Process</h3>
              <p className="text-slate-600 leading-relaxed">
                Our team reviews your complaint within 24 hours. We categorize and assign 
                it to the appropriate department for swift resolution.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-all duration-200 shadow-lg">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Resolution & Follow-up</h3>
              <p className="text-slate-600 leading-relaxed">
                We work diligently to resolve your complaint and keep you informed throughout 
                the process. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Nova Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Choose Nova?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <UserGroupIcon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Expert Team</h3>
                    <p className="text-slate-600">
                      Our experienced professionals are dedicated to understanding and resolving your concerns.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <ClockIcon className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast Response</h3>
                    <p className="text-slate-600">
                      We prioritize quick response times to ensure your issues are addressed promptly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircleIcon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Proven Results</h3>
                    <p className="text-slate-600">
                      High resolution rates and customer satisfaction scores demonstrate our commitment to excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-teal-500 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">1000+</div>
                    <div className="text-indigo-100">Complaints Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">4.9★</div>
                    <div className="text-indigo-100">Customer Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24h</div>
                    <div className="text-indigo-100">Avg Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">97%</div>
                    <div className="text-indigo-100">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Our support team is here to help you 24/7
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-600 mb-4">Speak directly with our support team</p>
              <a
                href="tel:1-800-NOVA-HELP"
                className="text-indigo-600 hover:text-indigo-700 font-semibold text-lg"
              >
                1-800-NOVA-HELP
              </a>
            </div>
              <div className="bg-slate-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-600 mb-4">Send us a detailed message</p>
              <a
                href="mailto:support@nova.com"
                className="text-teal-600 hover:text-teal-700 font-semibold text-lg"
              >
                support@nova.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
