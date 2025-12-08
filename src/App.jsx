import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import ClubsPage from './ClubsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/clubs" element={<ClubsPage />} />
    </Routes>
  )
}

export default App
