import React from 'react'

const JournalCard = ({ journal, handleDelete }) => {
  return (
    <div className='bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-cyan-400 transition-all duration-300'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold text-cyan-400'>
          {journal.topic}
        </h1>

        <span className='bg-slate-800 px-3 py-1 rounded text-sm'>
          {journal.difficulty}
        </span>
      </div>

      <p className='text-slate-300 leading-7'>
        {journal.description}
      </p>

      <div className='flex justify-between items-center mt-6'>
        <p className='text-slate-400'>
          ⏱ {journal.duration} Hours
        </p>

        <button
          onClick={() => handleDelete(journal._id)}
          className='bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default JournalCard