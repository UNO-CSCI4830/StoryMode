import { Book, Users, Sparkles, MessageSquare, Heart, Search } from 'lucide-react'
import PixelButton from './components/PixelButton.jsx'
import PixelCard from './components/PixelCard.jsx'
import Section from './components/Section.jsx'
import NavLink from './components/NavLink.jsx'

// Clubs
import ClubCard from './components/ClubCard.jsx'
import ClubsPage from './ClubsPage.jsx'

const px = {
  frame: 'border-8 border-black rounded-3xl shadow-chunky-lg',
}

const colors = {
  bg: 'from-amber-200 via-amber-300 to-amber-200',
  ink: 'text-zinc-900',
}

function scrollToClubs() {
  const el = document.getElementById('clubs')
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // focus the name input a moment later
  setTimeout(() => document.getElementById('club-name')?.focus(), 500)
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

export default function App() {
  return (
    <div className={`min-h-screen ${colors.ink}`} style={{ fontFamily: '"Press Start 2P", system-ui, ui-sans-serif, sans-serif' }}>
      {/* Background */}
      <div className={`fixed inset-0 -z-10 bg-gradient-to-b ${colors.bg}`}>
        <div className="absolute inset-0" style={{
          background:
            'radial-gradient(60% 60% at 50% 20%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%), radial-gradient(60% 60% at 100% 100%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 70%)',
        }} />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Story Mode logo"
              className="w-12 h-12 border-4 border-black rounded-xl shadow-chunky"
            />
            <span className="text-xl sm:text-2xl font-extrabold tracking-widest">Story Mode</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#clubs">Clubs</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <PixelButton onClick={scrollToClubs}>
              <Sparkles className="w-5 h-5" />
              Start a Club
            </PixelButton>

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
              An 8‑bit, 80s‑inspired home for readers. Create pixel‑perfect clubs, vote on the next read, and chat like it's 1989 — minus the dial‑up.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <PixelButton onClick={scrollToClubs}>
                <Sparkles className="w-5 h-5" />
                Create a Club
              </PixelButton>

              <PixelButton className="bg-amber-300">
                <Search className="w-5 h-5" />
                Explore Clubs
              </PixelButton>
            </div>
          </div>
          <div className="justify-self-center">
            <div className={`${px.frame} bg-amber-100 p-4`}>
              <img src="/logo.png" alt="Story Mode lamp + shelf logo" className="w-64 h-64 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section
        id="features"
        title="8‑bit features, modern power"
        subtitle="Everything you need to run a club — wrapped in a cozy retro shell."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature icon={Users} title="Member Rosters" desc="Invite friends, manage roles, and keep attendance with satisfying clicky buttons." />
          <Feature icon={Book} title="Reading Cycles" desc="Propose, vote, and schedule the next read. Pixel‑perfect progress bars included." />
          <Feature icon={MessageSquare} title="Chat & Threads" desc="Keep discussion organized with spoiler‑safe threads and emoji reactions." />
          <Feature icon={Sparkles} title="Themes" desc="Pick a palette: CRT Green, Neon Nights, or Caramel Console — or make your own." />
          <Feature icon={Heart} title="Recs & Shelves" desc="Rate books, track favorites, and build shared shelves across your clubs." />
          <Feature icon={Search} title="Discovery" desc="Browse trending clubs by genre, city, or vibe. Join in a single click." />
        </div>
      </Section>

      {/* Live clubs from backend */}
      <Section id="clubs" title="Your clubs">
        <ClubsPage />
      </Section>

      {/* Footer */}
      <footer className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-10 h-10 border-4 border-black rounded-xl" />
            <span className="font-extrabold tracking-widest">Story Mode</span>
          </div>
          <p className="text-center text-sm text-zinc-700">© {new Date().getFullYear()} Story Mode. All rights reserved.</p>
          <div className="justify-self-end flex gap-4 text-sm">
            <a href="#" className="font-bold">Privacy</a>
            <a href="#" className="font-bold">Terms</a>
            <a href="#" className="font-bold">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
