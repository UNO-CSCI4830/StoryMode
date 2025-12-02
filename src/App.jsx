import React from 'react'
import { Book, Users, Sparkles, MessageSquare, Heart, Search } from 'lucide-react'
import PixelButton from './components/PixelButton.jsx'
import PixelCard from './components/PixelCard.jsx'
import Section from './components/Section.jsx'
import NavLink from './components/NavLink.jsx'
import ClubCard from './components/ClubCard.jsx'
import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
  )
}

export default App