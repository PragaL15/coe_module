
import React from 'react';
import { useAuth } from './AuthContex'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminAccessPage = () => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
      setAuthToken(null); // Clear the token in context
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminAccessPage;
