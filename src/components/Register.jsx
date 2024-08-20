import React, { useState } from 'react';
import axios from '../axios'; // Import the axios instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify'; // Import toast

const Register = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password, role });
      setAuth(true);
      toast.success('Registration successful! Redirecting to login...', {
        position: "top-right",
        autoClose: 3000, // Toast will automatically close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/login'); // Redirect to the login page
        
      }, 3000);
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(`Error: ${err.response.data.message || 'Registration failed'}`, {
          position: "top-right",
          autoClose: 5000, // Toast will automatically close after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(`Error: ${err.message}`, {
          position: "top-right",
          autoClose: 5000, // Toast will automatically close after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-screen gap-y-3'>
      <div className='flex flex-col gap-y-3 md:w-1/3 w-full bg-white p-10 md:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
        <h2 className='text-3xl poppins-bold text-gray-700 text-center mb-10'>Register</h2>
        <form onSubmit={handleSubmit} className='space-y-3 flex flex-col'>
          <div>
            <p className='text-gray-700 poppins-medium'>Name</p>
            <input
              className='poppins-normal w-full border border-gray-400 rounded-md p-2'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <p className='text-gray-700 poppins-medium'>Password</p>
            <input
              className='poppins-normal w-full border border-gray-400 rounded-md p-2'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <p className='text-gray-700 poppins-medium'>Role</p>
            <select
              className='poppins-medium w-full border border-gray-400 p-2 rounded-md mb-3'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-blue-700 text-white hover:bg-indigo-200 md:py-2 md:text-lg md:px-10'
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
