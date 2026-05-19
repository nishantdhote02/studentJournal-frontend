import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateJournal from './pages/CreateJournal'
import AllJournal from './pages/AllJournal'
import Search from './pages/Search'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/register' element={<Register />} />
  <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/create'
          element={
            <ProtectedRoute>
              <CreateJournal />
            </ProtectedRoute>
          }
        />
          <Route
          path='/journals'
          element={
            <ProtectedRoute>
              <AllJournal />
            </ProtectedRoute>
          }
        />

        <Route
          path='/search'
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
          <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App