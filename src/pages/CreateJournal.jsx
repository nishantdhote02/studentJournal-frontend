import React, { useState } from 'react'
import API from '../api/axios'
import Sidebar from '../components/Sidebar'

const CreateJournal = () => {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    duration: '',
    difficulty: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.topic || !formData.description || !formData.difficulty) {
      alert('Please fill all required fields')
      return
    }

    try {
      setLoading(true)

      await API.post('/journal/create', formData)

      alert('Journal Created Successfully 🎉')

      // reset form
      setFormData({
        topic: '',
        description: '',
        duration: '',
        difficulty: '',
      })
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen bg-slate-950 text-white'>
      <Sidebar />

      <div className='flex-1 p-10 flex justify-center items-start'>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-900 p-10 rounded-2xl w-full max-w-[700px]'
        >
          <h1 className='text-3xl font-bold mb-8'>Create Journal</h1>

          {/* Topic */}
          <input
            type='text'
            name='topic'
            placeholder='Topic'
            value={formData.topic}
            onChange={handleChange}
            className='w-full p-3 mb-4 rounded bg-slate-800 outline-none'
          />

          {/* Description */}
          <textarea
            name='description'
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            className='w-full p-3 mb-4 rounded bg-slate-800 h-[150px] outline-none'
          />

          {/* Duration */}
          <input
            type='number'
            name='duration'
            placeholder='Duration (minutes)'
            value={formData.duration}
            onChange={handleChange}
            className='w-full p-3 mb-4 rounded bg-slate-800 outline-none'
          />

          {/* Difficulty */}
          <select
            name='difficulty'
            value={formData.difficulty}
            onChange={handleChange}
            className='w-full p-3 mb-6 rounded bg-slate-800 outline-none'
          >
            <option value=''>Select Difficulty</option>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='bg-cyan-500 px-8 py-3 rounded font-bold w-full disabled:opacity-50'
          >
            {loading ? 'Creating...' : 'Create Journal'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateJournal