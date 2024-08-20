// src/components/AttendanceList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autoTable plugin for jsPDF

const apiUrl = import.meta.env.VITE_API_URL;

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/attendance`);
        const data = res.data;
        // Debug log
        setAttendance(data);
        setFilteredAttendance(data);
      } catch (err) {
        console.error('Error fetching attendance data:', err);
      }
    };
    fetchAttendance();
  }, []);

  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    console.log('Selected date:', selectedDate); // Debug log

    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
    console.log('Formatted date for comparison:', formattedDate); // Debug log

    const filtered = attendance.filter(record => {
      const recordDate = new Date(record.date).toISOString().split('T')[0];
      console.log('Record date for comparison:', recordDate); // Debug log
      return recordDate === formattedDate;
    });

    setFilteredAttendance(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Attendance Records', 14, 16);
    doc.autoTable({
      head: [['Student Name', 'Date', 'Status']],
      body: filteredAttendance.map(record => [record.student.name, record.date, record.status]),
      startY: 20,
    });
    doc.save('attendance_records.pdf'+new Date().toISOString().split('T')[0]+'.pdf');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats to a readable date format
  };

  return (
    <div className='flex flex-col justify-center items-center  gap-y-3 '>
    <div className="p-4 w-full md:w-1/2">
          <h2 className='text-3xl poppins-bold text-gray-700 text-center mb-10'>Attendance Records</h2>


      <div className="flex justify-between items-center bg-gray-100 px-5 py-2 ">
        <p className="block  text-gray-700 poppins-medium'">Filter by Date</p>
        <input
          type="date"
          value={filterDate}
          onChange={handleFilterChange}
          className="border p-2 "
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs poppins-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs poppins-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs poppins-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((record) => (
                <tr key={record._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm poppins-medium text-gray-900">
                    {record.student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500">
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No records found for the selected date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={generatePDF}
        className=" mt-6 bg-green-500 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md   text-white hover:bg-green-200 md:py-2 md:text-lg md:px-10"
      >
        Download PDF
      </button>
    </div>

    </div>
  );
};

export default AttendanceList;
