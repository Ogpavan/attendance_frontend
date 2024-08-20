import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
      
      toast.success('Logged in successfully!');
      
      setTimeout(() => {
        navigate('/navigation');  // Update this to the correct route
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen gap-y-3'>
      <div className='flex flex-col gap-y-3 md:w-1/3 w-full bg-white p-10 md:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
        <h2 className='text-3xl poppins-bold text-gray-700 text-center mb-10'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-3 flex flex-col'>
          <div>
            <p className='text-gray-700 poppins-medium'>Email</p>
            <input
              className='poppins-normal w-full border border-gray-400 rounded-md p-2'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className='poppins-normal w-full border border-gray-400 rounded-md p-2 mb-3'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-blue-700 text-white hover:bg-indigo-200 md:py-2 md:text-lg md:px-10' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
