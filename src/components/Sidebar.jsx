import React from 'react'
import { Link } from 'react-router-dom'
import { FaBook, FaSearch, FaUser } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='w-[250px] bg-slate-950 h-screen p-6'>
      <h1 className='text-3xl font-bold text-cyan-400 mb-10'>LearnLog</h1>

      <div className='flex flex-col gap-6'>
        <Link className='flex items-center gap-3 hover:text-cyan-400' to='/dashboard'>
          <FaBook /> Dashboard
        </Link>

        <Link className='flex items-center gap-3 hover:text-cyan-400' to='/journals'>
          <FaBook /> Journals
        </Link>

        <Link className='flex items-center gap-3 hover:text-cyan-400' to='/search'>
          <FaSearch /> Search
        </Link>

        <Link className='flex items-center gap-3 hover:text-cyan-400' to='/profile'>
          <FaUser /> Profile
        </Link>
      </div>
    </div>
  )
}

export default Sidebar