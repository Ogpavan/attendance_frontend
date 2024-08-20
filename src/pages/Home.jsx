import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-y-3 '>
        <h1 className='text-3xl poppins-bold'>Welcome!</h1>
        <p className='text-sm poppins-normal mb-5'>Keep the attendance here</p>
        <Link to ="/login">
        <button className='w-full flex items-center justify-center px-10 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-12 poppins-medium">
            '>Login</button></Link>
        <Link to ="/register">
        <button className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-2 md:text-lg md:px-10
            '>Register</button></Link>
    </div>
  )
}

export default Home