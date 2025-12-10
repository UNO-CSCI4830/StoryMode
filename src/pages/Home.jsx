import { useNavigate } from 'react-router-dom'
import { Book, Users, Sparkles, MessageSquare, Heart, Search } from 'lucide-react'
import { useUser } from '../lib/useUser'
import PixelButton from '../components/PixelButton'
import PixelCard from '../components/PixelCard'
import Section from '../components/Section'
import NavLink from '../components/NavLink'
import logo from '../../assets/logo.png'

const px = {
    frame: 'border-8 border-black rounded-3xl shadow-chunky-lg',
}

const colors = {
    bg: 'from-amber-200 via-amber-300 to-amber-200',
    ink: 'text-zinc-900',
}

export default function Home() {
    const navigate = useNavigate()
    const { user, token, loading } = useUser()

    return (
        <div
            className={`min-h-screen ${colors.ink}`}
            style={{ fontFamily: '"Press Start 2P", system-ui, ui-sans-serif, sans-serif' }}
        >
            {/* Background */}
            <div className={`fixed inset-0 -z-10 bg-gradient-to-b ${colors.bg}`}>
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(60% 60% at 50% 20%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%), radial-gradient(60% 60% at 100% 100%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%)',
                    }}
                />
            </div>

            {/* Top nav */}
            <header className="sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3"
                    >
                        <img
                            src={logo}
                            alt="Story Mode logo"
                            className="w-12 h-12 border-4 border-black rounded-xl shadow-chunky"
                        />
                        <span className="text-xl sm:text-2xl font-extrabold tracking-widest">
                            Story Mode
                        </span>
                    </button>
                    <nav className="hidden sm:flex items-center gap-6">
                        <NavLink href="#features">Features</NavLink>
                        <button
                            type="button"
                            className="font-bold tracking-wide hover:opacity-80"
                            onClick={() => navigate('/explore')}
                        >
                            Clubs
                        </button>


                        {/* While loading, just show nothing extra */}
                        {loading ? null : token ? (
                            <>
                                <span className="text-xs text-zinc-800">
                                    Signed in as {user?.name || user?.user_name || 'you'}
                                </span>
                                <PixelButton onClick={() => navigate('/clubs')}>
                                    <Users className="w-5 h-5" />
                                    My clubs
                                </PixelButton>
                                <PixelButton
                                    type="button"
                                    onClick={() => {
                                        localStorage.removeItem('storymode_token')
                                        localStorage.removeItem('storymode_user_id')
                                        localStorage.removeItem('storymode_user_name')
                                        window.location.href = '/'
                                    }}
                                >
                                    Log out
                                </PixelButton>
                            </>
                        ) : (
                            <>
                                <PixelButton onClick={() => navigate('/login')}>
                                    <Users className="w-5 h-5" />
                                    Log in
                                </PixelButton>
                                <PixelButton onClick={() => navigate('/signup')}>
                                    <Users className="w-5 h-5" />
                                    Sign up
                                </PixelButton>
                                <PixelButton onClick={() => navigate('/signup')}>
                                    <Sparkles className="w-5 h-5" />
                                    Start a Club
                                </PixelButton>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="pt-12 sm:pt-20">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-widest drop-shadow">
                            Build rad, retro bookclubs
                        </h1>
                        <p className="mt-4 text-zinc-800 leading-relaxed">
                            An 8-bit, 80s-inspired home for readers. Create pixel-perfect clubs, vote on the
                            next read, and chat like it&apos;s 1989 - minus the dial-up.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <PixelButton onClick={() => navigate(token ? '/clubs' : '/signup')}>
                                <Sparkles className="w-5 h-5" />
                                Create a Club
                            </PixelButton>
                            <PixelButton className="bg-amber-300" onClick={() => navigate('/explore')}>
                                <Search className="w-5 h-5" />
                                Explore Clubs
                            </PixelButton>
                        </div>
                    </div>
                    <div className="justify-self-center">
                        <div className={`${px.frame} bg-amber-100 p-4`}>
                            <img
                                src={logo}
                                alt="Story Mode lamp + shelf logo"
                                className="w-64 h-64 mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <Section
                id="features"
                title="8-bit features, modern power"
                subtitle="Everything you need to run a club -- wrapped in a cozy retro shell."
            >
                <div className="grid sm:grid-cols-2 lg:grid-cos-3 gap-6">
                    <Feature
                        icon={Users}
                        title="Member Rosters"
                        desc="Invite friends, manage roles, and keep attendance with satisfying clicky buttons."
                    />
                    <Feature
                        icon={Book}
                        title="Reading Cycles"
                        desc="Propose, vote, and schedule the next read. Pixel-perfect progress bars included."
                    />
                    <Feature
                        icon={MessageSquare}
                        title="Chat & Threads"
                        desc="Keep discussion organized with spoiler-safe threads and emoji reactions."
                    />
                    <Feature
                        icon={Sparkles}
                        title="Themes"
                        desc="Pick a palette: CRT Green, Neon Nights, or Caramel Console — or make your own."
                    />
                    <Feature
                        icon={Heart}
                        title="Recs & Shelves"
                        desc="Rate books, track favorites, and build shared shelves across your clubs."
                    />
                    <Feature
                        icon={Search}
                        title="Discovery"
                        desc="Browse trending clubs by genre, city, or vibe. Join in a single click."
                    />
                </div>
            </Section>

            {/* Footer */}
            <footer className="py-12">
                <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-8 items-center">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="w-10 h-10 border-4 border-black rounded-xl"
                        />
                        <span className="font-extrabold tracking-widest">Story Mode</span>
                    </div>
                    <p className="text-center text-sm text-zinc-700">
                        © {new Date().getFullYear()} Story Mode. All rights reserved.
                    </p>
                    <div className="justify-self-end flex gap-4 text-sm">
                        <a href="#" className="font-bold">
                            Privacy
                        </a>
                        <a href="#" className="font-bold">
                            Terms
                        </a>
                        <a href="#" className="font-bold">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function Feature({ icon: Icon, title, desc }) {
    return (
        <PixelCard>
            <div className="flex items-start gap-4">
                <div className="shrink-0 p-3 bg-green-300 border-4 border-black rounded-xl shadow-chunky">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-extrabold text-lg mb-1">{title}</h3>
                    <p className="text-zinc-700 leading-relaxed">{desc}</p>
                </div>
            </div>
        </PixelCard>
    )
}
