import React, { useState } from 'react'
import { Users } from 'lucide-react'
import PixelButton from '../components/PixelButton'
import PixelCard from '../components/PixelCard'
import NavLink from '../components/NavLink'
import logo from '../../public/logo.png'

const px = {
    frame: 'border-8 border-black rounded-3xl shadow-chunky-lg',
}

const colors = {
    bg: 'from-amber-200 via-amber-300 to-amber-200',
    ink: 'text-zinc-900',
}

export default function SignUp() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    return (
        <div className={`min-h-screen ${colors.ink}`} style={{fontFamily: '"Press Start 2P, system-ui, ui-sans-serif, sans-serif"'}}>
            {/* Background */}
            <div className={`fixed inset-0 -z-10 bg-gradient-to-b ${colors.bg}`}>
                <div className="absolute inset-0" style ={{
                    background:
                        'radial-gradient(60% 60% at 50% 20%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%), radial-gradient(60% 60% at 100% 100%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%)',
                }} />
            </div>
        

            {/* Top nav */}
            <header className="sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Story Mode logo"
                            className="w-12 h-12 border-4 border-black rounded-xl shadow-chunky"
                        />
                        <span className="text-xl sm:text-2xl font-extrabold tracking-widest">Story Mode</span>
                    </a>
                    <nav className="hidden sm:flex items-center gap-6">
                        <NavLink href="/">Home</NavLink>
                    </nav>
                </div>
            </header>

            {/* sign up card */}
            <main className="flex items-center justify-center py-24 px-4">
                <div className="w-full max-w-md">
                    <PixelCard>
                        <h2 className="text-lg font-extrabold mb-4">Sign Up</h2>
                        <form onSubmit={async (e) => {
                            // placeholder submit handler
                            e.preventDefault()
                            setError(null)
                            if (!name.trim()) return setError('Please enter a username')
                            if (!password) return setError('Please enter a password')
                            setLoading(true)
                            
                            // simulate short delay
                            await new Promise((r) => setTimeout(r, 500))

                            // record user locally
                            const fakeId = `local_${Date.now()}`
                            localStorage.setItem('storymode_user_id', fakeId)
                            localStorage.setItem('storymode_user_name', name.trim())
                            setLoading(false)
                            setSuccess(true)
                        }}>
                            <div className="mb-3">
                                <label htmlFor="username" className="block text-sm font-bold mb-1">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 border-4 border-black rounded-md bg-amber-50"
                                    placeholder="username"    
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="block text-sm font-bold mb-1">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border-4 border-black rounded-md bg-amber-50"
                                    placeholder="password"
                                />
                            </div>  
                            {error && <div className="text-sm text-red-700 mb-3">{error}</div>}
                            <div className="flex gap-3">
                                <PixelButton type="submit" className="bg-amber-300" disabled={loading || success}>
                                    <Users className="w-4 h-4" />
                                    {loading ? 'Signing up...' : success ? 'Signed up' : 'Sign up'}
                                </PixelButton>
                                <PixelButton type="button" onClick={() => { setName(''); setPassword(''); setError(null); setSuccess(false); }}>
                                    Reset
                                </PixelButton>
                            </div>
                            {success && <div className="mt-3 text-sm text-green-700">Sign up simulated</div>}
                        </form>  
                    </PixelCard>

                </div>
            </main>
        </div>
    )
}