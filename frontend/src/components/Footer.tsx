import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p className="text-sm">
          &copy; {currentYear} nova's Complaint Manager. Built with accessibility and user experience in mind.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
