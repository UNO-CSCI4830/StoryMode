import React, { useState } from 'react'
import PixelButton from '../components/PixelButton'
import PixelCard from '../components/PixelCard'
import Section from '../components/Section'
import NavLink from '../components/NavLink'

const Login = () => {
    const px = {
        frame: 'border-8 border-black rounded-3xl shadow-chunky-lg',
    }

    const colors = {
        bg: 'from-amber-200 via-amber-300 to-amber-200',
        ink: 'text-zinc-900',
    }

    const [UserID, setUserID] = useState('')
    const [pin, setPin] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents default form submission behavior
    }

    // Add authentication logic

    return (
        <div className={`min-h-screen ${colors.ink}`} style={{fontFamily: '"Press Start 2P, system-ui, ui-sans-serif, sans-serif'}}>
            {/* Background */}
            <div className={`fixed inset-0 -z-10 bg-gradient-to-b ${colors.bg}`}>
                <div className="absolute inset-0" style ={{
                    background:
                        'radial-gradient(60% 60% at 50% 20%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%), radial-gradient(60% 60% at 100% 100%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%)',
                }} />
            </div>

            {/* Log in */}
            <header className="sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-3"> /
                     {/*  */}   
                    </a>
                </div>
            </header>
        </div>
    )
}

export default Login;



