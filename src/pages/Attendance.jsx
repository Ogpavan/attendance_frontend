// src/pages/Attendance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [newAttendance, setNewAttendance] = useState({
    studentId: '',
    date: '',
    status: 'present'
  });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch existing attendance records
    axios.get('/api/attendance')
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));

    // Fetch students for the dropdown
    axios.get('/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setNewAttendance({ ...newAttendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/attendance', newAttendance)
      .then(res => {
        setAttendance([...attendance, res.data]);
        setNewAttendance({ studentId: '', date: '', status: 'present' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student</label>
          <select
            name="studentId"
            value={newAttendance.studentId}
            onChange={handleChange}
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={newAttendance.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={newAttendance.status}
            onChange={handleChange}
            required
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
        <button type="submit">Add Attendance</button>
      </form>
      
      <h3>Attendance Records</h3>
      <ul>
        {attendance.map((record) => (
          <li key={record._id}>
            Student ID: {record.studentId} - Date: {record.date} - Status: {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
