// src/pages/Students.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    class: '',
    parentContact: ''
  });

  useEffect(() => {
    axios.get(`${apiUrl}/api/students`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setStudents(res.data);
          console.log('Students fetched successfully:', res.data);
        } else {
          console.error('Expected an array but got:', res.data);
          setStudents([]);
        }
      })
      .catch(err => {
        console.error('Error fetching students:', err);
        setStudents([]); // Optionally, show an error message to the user
      });
  }, []);
  

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}/api/students`, newStudent)
      .then(res => {
        setStudents([...students, res.data]);
        setNewStudent({ name: '', rollNumber: '', class: '', parentContact: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Student Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={newStudent.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="rollNumber" value={newStudent.rollNumber} onChange={handleChange} placeholder="Roll Number" required />
        <input type="text" name="class" value={newStudent.class} onChange={handleChange} placeholder="Class" required />
        <input type="text" name="parentContact" value={newStudent.parentContact} onChange={handleChange} placeholder="Parent Contact" />
        <button type="submit">Add Student</button>
      </form>
      <ul>
        {students.forEach((student) => (
          <li key={student._id}>
            {student.name} - {student.rollNumber} - {student.class} - {student.parentContact}
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default Students;
