import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn, setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7164/api/Authentication/login', {
        email,
        password
      });

      console.log('Login successful, token stored!');
      console.log('Response:', response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      setIsLoggedIn(true);
      setUserRole(response.data.role);

      const userRole = response.data.role;
      console.log('User Role:', userRole);

      if (userRole === 'Seller') {
        navigate('/add-property');
      } else if (userRole === 'Buyer') {
        navigate('/properties');
      }

    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid Credentials');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
