import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  console.log('AdminDashboard rendering...');
  
  return (
    <div>
      <h1>Admin Dashboard - Simple Test</h1>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      <p>This is a simple test version.</p>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Complaint</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Status</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px' }}>Test User</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>test@example.com</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>This is a test complaint</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>Pending</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              <button>Resolve</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
