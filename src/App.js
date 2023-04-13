import React from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Account from './components/Account'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoutes'

import './App.css'
function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
