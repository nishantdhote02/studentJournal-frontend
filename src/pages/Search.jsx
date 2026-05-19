import React, { useState } from 'react'
import API from '../api/axios'
import Sidebar from '../components/Sidebar'

const Search = () => {
  const [topic, setTopic] = useState('')
  const [journals, setJournals] = useState([])

  const handleSearch = async () => {
    try {
      const res = await API.get(`/search?topic=${topic}`)

      setJournals(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex'>
      <Sidebar />

      <div className='flex-1 p-10'>
        <h1 className='text-4xl font-bold mb-10'>Search Journal</h1>

        <div className='flex gap-4 mb-10'>
          <input
            type='text'
            placeholder='Search by topic'
            className='bg-slate-900 p-4 rounded w-[400px]'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className='bg-cyan-500 px-6 rounded font-bold'
          >
            Search
          </button>
        </div>

        <div className='grid grid-cols-3 gap-8'>
          {journals.map((journal) => (
            <div
              key={journal._id}
              className='bg-slate-900 p-6 rounded-2xl'
            >
              <h1 className='text-2xl font-bold text-cyan-400'>
                {journal.topic}
              </h1>

              <p className='mt-4'>{journal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search