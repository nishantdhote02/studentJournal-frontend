import React, { useEffect, useState } from 'react'
import API from '../api/axios'
import Sidebar from '../components/Sidebar'

const AllJournal = () => {
  const [journals, setJournals] = useState([])

  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
    try {
      const res = await API.get('/journal/all')

      setJournals(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id) => {
    try {
      await API.delete(`/journal/delete/${id}`)

      fetchJournals()
    } catch (error) {
      console.log(error)
    }
  }
   return (
    <div className='flex'>
      <Sidebar />

      <div className='flex-1 p-10'>
        <div className='flex justify-between items-center mb-10'>
          <h1 className='text-4xl font-bold'>All Journals</h1>
        </div>

        <div className='grid grid-cols-3 gap-8'>
          {journals.map((journal) => (
            <div
              key={journal._id}
              className='bg-slate-900 p-6 rounded-2xl border border-slate-700'
            >
              <h1 className='text-2xl font-bold text-cyan-400'>
                {journal.topic}
              </h1>  <p className='mt-4 text-slate-300'>
                {journal.description}
              </p>

              <div className='mt-5 flex justify-between'>
                <p>{journal.duration} Hours</p>
                <p>{journal.difficulty}</p>
              </div>

              <button
                onClick={() => handleDelete(journal._id)}
                className='mt-6 bg-red-500 px-5 py-2 rounded'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllJournal