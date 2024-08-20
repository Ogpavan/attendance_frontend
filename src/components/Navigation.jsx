import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div>
          
    <div className='flex justify-center items-center gap-y-5   h-screen  flex-col'>
       
        <div className='grid gap-y-7 text-center'>
        <Link to='/students'>
        <div className='text-xl poppins-medium text-gray-800 px-10 py-2 rounded-md shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:shadow-sm hover:text-gray-400'>All Students</div>
        </Link>

        <Link to='/add-student'>
        <div className='text-xl poppins-medium text-gray-800 px-10 py-2 rounded-md shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  hover:shadow-sm hover:text-gray-400'>Add Student</div>
        </Link>

        <Link to='/mark-attendance'>
        <div className='text-xl poppins-medium text-gray-800 px-10 py-2 rounded-md shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  hover:shadow-sm hover:text-gray-400'>Mark Attendance</div>
        </Link>
        <Link to='/attendance'>
        <div className='text-xl poppins-medium text-gray-800 px-10 py-2 rounded-md shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  hover:shadow-sm hover:text-gray-400'>Attendance</div>
        </Link>
    </div>
    </div>
    </div>
  )
}

export default Navigation