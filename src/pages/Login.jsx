import React, { useState } from 'react'
import API from '../api/axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
 const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post('/auth/login', formData)

      localStorage.setItem('token', res.data.token)

      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  } 
   return (
    <div className='h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-slate-900 p-10 rounded-2xl w-[400px]'
      >
        <h1 className='text-3xl font-bold mb-8 text-center'>Login</h1>

        <input
          type='email'
          name='email'
          placeholder='Enter Email'
          className='w-full p-3 mb-4 rounded bg-slate-800'
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          className='w-full p-3 mb-4 rounded bg-slate-800'
          onChange={handleChange}
        />

        <button className='w-full bg-cyan-500 p-3 rounded font-bold'>
          Login
        </button>

        <p className='mt-4 text-center'>
          No account? <Link className='text-cyan-400' to='/register'>Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login