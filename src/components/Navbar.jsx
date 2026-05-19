import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-slate-900 px-8 py-4 flex justify-between items-center border-b border-slate-700'>
      <h1 className='text-2xl font-bold text-cyan-400'>LearnLog</h1>

      <div className='flex gap-6'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/journals'>Journals</Link>
        <Link to='/search'>Search</Link>
        <Link to='/profile'>Profile</Link>
      </div>
    </div>
  )
}

export default Navbar