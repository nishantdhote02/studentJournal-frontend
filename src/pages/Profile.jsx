import React, { useEffect, useState } from 'react'
import API from '../api/axios'
import Sidebar from '../components/Sidebar'

const Profile = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await API.get('/profile/me')

      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex'>
      <Sidebar />

      <div className='flex-1 p-10'>
        <div className='bg-slate-900 p-10 rounded-2xl max-w-[700px]'>
          <h1 className='text-4xl font-bold mb-10'>Profile</h1>

          <div className='space-y-6'>
            <div>
              <p className='text-slate-400'>Name</p>
              <h2 className='text-2xl'>{user.name}</h2>
            </div>

            <div>
              <p className='text-slate-400'>Email</p>
              <h2 className='text-2xl'>{user.email}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile