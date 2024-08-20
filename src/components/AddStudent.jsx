// src/components/AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
const apiUrl = import.meta.env.VITE_API_URL;


const AddStudent = () => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [parentContact, setParentContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/students`, { name, rollNumber, class: studentClass, parentContact });
      setName('');
      setRollNumber('');
      setStudentClass('');
      setParentContact('');
      toast.success('Student added successfully...', {
        position: "top-right",
        autoClose: 1000, // Toast will automatically close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: "top-right",
        autoClose: 5000, // Toast will automatically close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
      );
    }
  };

  return (
    <div className='flex justify-center items-center h-screen gap-y-3'>
      <div className='flex flex-col gap-y-3 md:w-1/3 w-full bg-white p-7 md:p-10 md:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
      <h2 className='text-3xl poppins-bold text-gray-700 text-center mb-10'>Add Student</h2>
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
        <p className='text-gray-700 poppins-medium'>Roll Number</p>
       
          <input
            className='poppins-normal w-full border border-gray-400 rounded-md p-2'
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>
        <div>
        <p className='text-gray-700 poppins-medium'>Class</p>
    
          <input
            className='poppins-normal w-full border border-gray-400 rounded-md p-2'
            type="text"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            required
          />
        </div>
        <div>
        <p className='text-gray-700 poppins-medium'>Contact</p>
      
          <input
            className='poppins-normal w-full border border-gray-400 rounded-md p-2 mb-3'
            type="text"
            value={parentContact}
            onChange={(e) => setParentContact(e.target.value)}
          />
        </div>
        <button
         className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-blue-700 text-white hover:bg-indigo-200 md:py-2 md:text-lg md:px-10' type="submit">Add Student</button>
      </form>
    </div>
    </div>

  );
};

export default AddStudent;
