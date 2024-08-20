// src/components/StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('name'); // Default sorting by name

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/students`);
        setStudents(res.data);
        console.log('Students fetched successfully:', res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  // Function to handle sorting
  const sortStudents = (criteria) => {
    setSortCriteria(criteria);
    const sortedStudents = [...students].sort((a, b) => {
      if (criteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (criteria === 'rollNumber') {
        return a.rollNumber.localeCompare(b.rollNumber);
      }
      return 0;
    });
    setStudents(sortedStudents);
  };

  // Function to handle search filtering
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.rollNumber.toLowerCase().includes(query)
    );
  });

  return (
    <div className='flex flex-col justify-center items-center'>
   <h2 className='text-3xl poppins-bold text-gray-700 text-center md:mb-10 mb-5 py-5 px-3'>List of All Students</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or roll number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-[1px] border-gray-800 px-4 py-2 rounded-md mb-4 w-full outline-none"
        />
        <div className='w-full flex justify-center items-center'>
        <button
          onClick={() => sortStudents('name')}
          className="px-2 py-1 text-xs md:text-sm md:px-4 md:py-2 poppins-medium  border-[1px] border-black rounded mr-2"
        >
          Sort by Name
        </button>
        <button
          onClick={() => sortStudents('rollNumber')}
          className="px-2 py-1 text-xs md:text-sm md:px-4  md:py-2 poppins-medium border-[1px] border-black rounded"
        >
          Sort by Roll Number
        </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll Number
              </th>
              <th className="px-6 py-3 text-left text-xs poppins-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
