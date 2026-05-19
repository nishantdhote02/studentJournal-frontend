import React, { useEffect, useState } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const [journals, setJournals] = useState([])

  const [search, setSearch] = useState('')

  const [showModal, setShowModal] = useState(false)

  const [profile, setProfile] = useState({
    name: '',
    email: '',
  })

  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    duration: '',
    difficulty: '',
  })

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCreateJournal = async (e) => {
    e.preventDefault()

    try {
      await API.post('/journal/create', formData)

      fetchJournals()

      setShowModal(false)

      setFormData({
        topic: '',
        description: '',
        duration: '',
        difficulty: '',
      })

      alert('Journal Created Successfully')
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

  const handleLogout = () => {
    localStorage.removeItem('token')

    navigate('/')
  }

  const updateProfile = async () => {
    try {
      await API.put('/profile/update', profile)

      alert('Profile Updated')
    } catch (error) {
      console.log(error)
    }
  }

  const filteredJournals = journals.filter((journal) =>
    journal.topic
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className='flex min-h-screen bg-[#0f172a] text-white'>
      {/* Sidebar */}
      <div className='w-[280px] bg-[#111827] border-r border-slate-800 p-8'>
        <h1 className='text-4xl font-bold mb-12'>
          Learn<span className='text-cyan-400'>Track</span>
        </h1>

        <div className='flex flex-col gap-5'>
          <button className='bg-cyan-500 text-black font-semibold py-4 rounded-2xl'>
            Dashboard
          </button>

          <button
            onClick={() => setShowModal(true)}
            className='bg-slate-800 py-4 rounded-2xl hover:bg-slate-700 transition-all'
          >
            Create Journal
          </button>

          <button className='bg-slate-800 py-4 rounded-2xl hover:bg-slate-700 transition-all'>
            My Journals
          </button>

          <button className='bg-slate-800 py-4 rounded-2xl hover:bg-slate-700 transition-all'>
            Analytics
          </button>

          <button className='bg-slate-800 py-4 rounded-2xl hover:bg-slate-700 transition-all'>
            Profile
          </button>
        </div>

        <div className='mt-20 bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-3xl'>
          <h2 className='text-2xl font-bold text-black'>
            Learning Streak
          </h2>

          <p className='text-5xl font-bold mt-4 text-black'>
            12 Days 🔥
          </p>
        </div>
      </div>

      {/* Main */}
      <div className='flex-1 p-10'>
        {/* Topbar */}
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-5xl font-bold'>
              Learning Dashboard
            </h1>

            <p className='text-slate-400 mt-3 text-xl'>
              Track your coding journey and daily growth
            </p>
          </div>

          <div className='flex items-center gap-5'>
            <input
              type='text'
              placeholder='Search journals...'
              onChange={(e) => setSearch(e.target.value)}
              className='bg-slate-800 px-6 py-4 rounded-2xl outline-none w-[320px]'
            />

            <button
              onClick={handleLogout}
              className='bg-red-500 px-8 py-4 rounded-2xl font-semibold hover:bg-red-600 transition-all'
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-4 gap-8 mt-12'>
          <div className='bg-[#1e293b] p-8 rounded-[30px] border border-slate-700'>
            <p className='text-slate-400 text-xl'>
              Total Journals
            </p>

            <h1 className='text-6xl font-bold mt-5 text-cyan-400'>
              {journals.length}
            </h1>
          </div>

          <div className='bg-[#1e293b] p-8 rounded-[30px] border border-slate-700'>
            <p className='text-slate-400 text-xl'>
              Study Hours
            </p>

            <h1 className='text-6xl font-bold mt-5 text-blue-400'>
              58
            </h1>
          </div>

          <div className='bg-[#1e293b] p-8 rounded-[30px] border border-slate-700'>
            <p className='text-slate-400 text-xl'>
              Topics Learned
            </p>

            <h1 className='text-6xl font-bold mt-5 text-green-400'>
              16
            </h1>
          </div>

          <div className='bg-[#1e293b] p-8 rounded-[30px] border border-slate-700'>
            <p className='text-slate-400 text-xl'>
              Productivity
            </p>

            <h1 className='text-5xl font-bold mt-5 text-yellow-400'>
              92%
            </h1>
          </div>
        </div>

        {/* Recent Journals */}
        <div className='bg-[#1e293b] rounded-[35px] p-10 mt-12 border border-slate-700'>
          <div className='flex justify-between items-center mb-10'>
            <h1 className='text-4xl font-bold'>
              Recent Journals
            </h1>

            <button
              onClick={() => setShowModal(true)}
              className='bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-2xl font-bold text-black hover:scale-105 transition-all'
            >
              + Create Journal
            </button>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-slate-700 text-left'>
                  <th className='py-5 text-xl'>Topic</th>
                  <th className='py-5 text-xl'>Difficulty</th>
                  <th className='py-5 text-xl'>Duration</th>
                  <th className='py-5 text-xl'>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredJournals.map((journal) => (
                  <tr
                    key={journal._id}
                    className='border-b border-slate-800 hover:bg-slate-800 transition-all'
                  >
                    <td className='py-6 text-lg font-semibold'>
                      {journal.topic}
                    </td>

                    <td>
                      <span className='bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl'>
                        {journal.difficulty}
                      </span>
                    </td>

                    <td className='text-slate-300'>
                      {journal.duration} Hours
                    </td>

                    <td>
                      <div className='flex gap-4'>
                        <button className='bg-blue-500 px-5 py-2 rounded-xl hover:bg-blue-600 transition-all'>
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(journal._id)
                          }
                          className='bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition-all'
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Update */}
        <div className='bg-[#1e293b] p-8 rounded-3xl mt-12 border border-slate-700'>
          <h1 className='text-3xl font-bold mb-6'>
            Update Profile
          </h1>

          <input
            type='text'
            placeholder='Name'
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            className='w-full bg-slate-800 p-4 rounded-xl mb-4'
          />

          <input
            type='email'
            placeholder='Email'
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
            className='w-full bg-slate-800 p-4 rounded-xl mb-6'
          />

          <button
            onClick={updateProfile}
            className='bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold'
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center'>
          <form
            onSubmit={handleCreateJournal}
            className='bg-[#1e293b] p-10 rounded-3xl w-[500px]'
          >
            <h1 className='text-3xl font-bold mb-6'>
              Create Journal
            </h1>

            <input
              type='text'
              name='topic'
              placeholder='Topic'
              value={formData.topic}
              onChange={handleChange}
              className='w-full bg-slate-800 p-4 rounded-xl mb-4'
            />

            <textarea
              name='description'
              placeholder='Description'
              value={formData.description}
              onChange={handleChange}
              className='w-full bg-slate-800 p-4 rounded-xl mb-4 h-32'
            />

            <input
              type='number'
              name='duration'
              placeholder='Duration'
              value={formData.duration}
              onChange={handleChange}
              className='w-full bg-slate-800 p-4 rounded-xl mb-4'
            />

            <select
              name='difficulty'
              value={formData.difficulty}
              onChange={handleChange}
              className='w-full bg-slate-800 p-4 rounded-xl mb-6'
            >
              <option value=''>
                Select Difficulty
              </option>

              <option value='Easy'>Easy</option>

              <option value='Medium'>Medium</option>

              <option value='Hard'>Hard</option>
            </select>

            <div className='flex gap-4'>
              <button className='bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold'>
                Create
              </button>

              <button
                type='button'
                onClick={() => setShowModal(false)}
                className='bg-red-500 px-6 py-3 rounded-xl'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}