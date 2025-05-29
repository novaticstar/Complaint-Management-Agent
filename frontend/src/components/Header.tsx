import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  ChartBarIcon, 
  Bars3Icon, 
  XMarkIcon,
  SparklesIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
      >
        Skip to main content
      </a>

      <header className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-slate-200/50 sticky top-0 z-40" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg"
                aria-label="Nova - Go to homepage"
              >
                <div className="flex items-center space-x-3">                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <SparklesIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-xl opacity-30 group-hover:animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent">
                      nova
                    </h1>
                    <p className="text-xs text-slate-500 -mt-1">Complaint Management</p>
                  </div>
                </div>
              </Link>
            </div>
              {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  location.pathname === '/'
                    ? 'bg-indigo-100 text-indigo-700 shadow-md scale-105'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
                aria-current={location.pathname === '/' ? 'page' : undefined}              >
                <div className="flex items-center space-x-2">
                  <HomeIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Home</span>
                </div>
              </Link>
              
              <Link
                to="/submit"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  location.pathname === '/submit'
                    ? 'bg-indigo-100 text-indigo-700 shadow-md scale-105'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
                aria-current={location.pathname === '/submit' ? 'page' : undefined}
              >
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Submit Complaint</span>
                </div>
              </Link>
              
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  location.pathname === '/admin'
                    ? 'bg-teal-100 text-teal-700 shadow-md scale-105'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
                aria-current={location.pathname === '/admin' ? 'page' : undefined}
              >
                <div className="flex items-center space-x-2">
                  <ChartBarIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Admin Dashboard</span>
                </div>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-colors duration-200"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle main menu"              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/50 nova-animate-fade-in">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  location.pathname === '/'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
                aria-current={location.pathname === '/' ? 'page' : undefined}              >
                <div className="flex items-center space-x-2">
                  <HomeIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Home</span>
                </div>
              </Link>
              
              <Link
                to="/submit"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  location.pathname === '/submit'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
                aria-current={location.pathname === '/submit' ? 'page' : undefined}
              >
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Submit Complaint</span>
                </div>
              </Link>
              
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  location.pathname === '/admin'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
                aria-current={location.pathname === '/admin' ? 'page' : undefined}
              >
                <div className="flex items-center space-x-2">
                  <ChartBarIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Admin Dashboard</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
