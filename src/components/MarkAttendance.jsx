import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [studentsRes, attendanceRes] = await Promise.all([
          axios.get(`${apiUrl}/api/students`),
          axios.get(`${apiUrl}/api/attendance`)
        ]);
        setStudents(studentsRes.data);
        setAttendance(attendanceRes.data);
      } catch (err) {
        toast.error(`Error: ${err.message}`, {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleStudentSelection = (id) => {
    setSelectedStudentIds(prevSelected => 
      prevSelected.includes(id)
        ? prevSelected.filter(studentId => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const studentId of selectedStudentIds) {
        const existingRecord = attendance.find(
          (record) => record.studentId === studentId && record.date === date
        );

        if (existingRecord) {
          await axios.put(`${apiUrl}/api/attendance/${existingRecord._id}`, {
            ...existingRecord,
            status
          });
          setAttendance(prevAttendance =>
            prevAttendance.map(record =>
              record._id === existingRecord._id ? { ...record, status } : record
            )
          );
        } else {
          await axios.post(`${apiUrl}/api/attendance`, { studentId, date, status });
          setAttendance(prevAttendance => [...prevAttendance, { studentId, date, status }]);
        }
      }
      toast.success('Attendance marked successfully!', {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
      setSelectedStudentIds([]);
      setDate('');
      setStatus('present');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen gap-y-3'>
      <div className='flex flex-col gap-y-3 md:w-1/3 w-full bg-white p-10 md:shadow-lg'>
        <h2 className='text-3xl font-bold text-gray-700 text-center mb-10'>Mark Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p className='text-gray-700 font-medium'>Students:</p>
            <div className="scrollable-div" style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
              {students.map(student => (
                <div
                  key={student._id}
                  onClick={() => toggleStudentSelection(student._id)}
                  className={`cursor-pointer ${selectedStudentIds.includes(student._id) ? 'bg-green-200' : 'bg-white'} p-2 mb-2 border border-gray-300`}
                >
                  {student.name}
                </div>
              ))}
            </div>
          </div>
          <div className='py-3'>
            <p className='text-gray-700 font-medium'>Date:</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className='border border-gray-300 p-2 w-full'
            />
          </div>
          <div className='py-3'>
            <p className='text-gray-700 font-medium'>Status:</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='border border-gray-300 p-2 w-full'
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <button 
            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-blue-700 text-white hover:bg-blue-800'
            type="submit"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Mark Attendance'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarkAttendance;
