import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Nova Complaint Management</p>
    </footer>
  );
};

export default Footer;
