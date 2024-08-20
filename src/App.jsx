import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import MarkAttendance from './components/MarkAttendance';
import AttendanceList from './components/AttendanceList';
import Home from './pages/Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation';

const App = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div>
        {/* Include ToastContainer at the top level of the app */}
        <ToastContainer />
        
        <nav className='hidden'>
          <ul>
            {auth ? (
              <>
                <li><a href="/students">Students</a></li>
                <li><a href="/add-student">Add Student</a></li>
                <li><a href="/mark-attendance">Mark Attendance</a></li>
                <li><a href="/attendance">Attendance</a></li>
                <li><button onClick={() => { localStorage.removeItem('token'); setAuth(false); }}>Logout</button></li>
              </>
            ) : (
              <>
                {/* No navigation items when not authenticated */}
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
         <Route path='/navigation' element={<Navigation />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />
          <Route path="/students" element={auth ? <StudentList /> : <Login setAuth={setAuth} />} />
          <Route path="/add-student" element={auth ? <AddStudent /> : <Login setAuth={setAuth} />} />
          <Route path="/mark-attendance" element={auth ? <MarkAttendance /> : <Login setAuth={setAuth} />} />
          <Route path="/attendance" element={auth ? <AttendanceList /> : <Login setAuth={setAuth} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
