import React, { useState } from 'react'
import { Book, Users, Sparkles, MessageSquare, Heart, Search } from 'lucide-react'

import PixelButton from './components/PixelButton.jsx'
import PixelCard from './components/PixelCard.jsx'
import Section from './components/Section.jsx'
import NavLink from './components/NavLink.jsx'
import ClubCard from './components/ClubCard.jsx'
import CreateClubForm from './components/CreateClubForm.jsx'
import ClubDetail from './components/ClubDetail.jsx'

const px = {
  frame: 'border-8 border-black rounded-3xl shadow-chunky-lg',
}

const colors = {
  bg: 'from-amber-200 via-amber-300 to-amber-200',
  ink: 'text-zinc-900',
}

// sample “trending” clubs (read-only as other users don't exist yet)
const trendingClubs = [
  { name: 'Neo-Noir Nights', genre: 'Mystery / Thriller', members: 128 },
  { name: 'Byte-Size Classics', genre: 'Literary', members: 86 },
  { name: 'Dungeon Readers', genre: 'Fantasy / RPG tie-ins', members: 203 },
  { name: 'Synthwave Sci-Fi', genre: 'Science Fiction', members: 164 },
  { name: 'Page & Pixel', genre: 'Indie / Zines', members: 57 },
  { name: 'Tea & Tomes', genre: 'Cozy', members: 92 },
]

// a little starter data for the “your clubs” area
function createInitialClubs() {
  return [
    {
      id: 'club-1',
      name: 'Cozy Cartridge Club',
      genre: 'Cozy fantasy / slice of life',
      vibe: 'Low-stakes adventures, tea, and talking about feelings.',
      books: [
        {
          id: 'b1',
          title: 'Legends & Lattes',
          author: 'Travis Baldree',
          status: 'current',
        },
      ],
      messages: [
        {
          id: 'm1',
          user: 'Lara',
          text: 'Next meeting: bring your favorite cozy drink!',
          timestamp: '7:30 PM',
        },
      ],
    },
  ]
}

export default function App() {
  const [userClubs, setUserClubs] = useState(createInitialClubs)
  const [selectedClubId, setSelectedClubId] = useState('club-1')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const selectedClub = userClubs.find((c) => c.id === selectedClubId) || null
 function goToMyClubs(openForm = false) {
    if (typeof document !== 'undefined') {
      const section = document.getElementById('my-clubs')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    if (openForm) {
      setShowCreateForm(true)
    }
  }

  // when the create-club form submits
  function handleCreateClub({ name, genre, vibe, initialBook }) {
    const id = `club-${Date.now()}`
    const newClub = {
      id,
      name,
      genre: genre || 'Mixed',
      vibe: vibe || 'Custom Story Mode club',
      books: [],
      messages: [],
    }

    if (initialBook) {
      newClub.books.push({
        id: `book-${Date.now()}`,
        title: initialBook.title,
        author: initialBook.author || '',
        status: 'current',
      })
    }

    setUserClubs((prev) => [...prev, newClub])
    setSelectedClubId(id)
    setShowCreateForm(false)
  }

  function handleAddBookToSelected(book) {
    if (!selectedClub) return
    setUserClubs((prev) =>
      prev.map((club) =>
        club.id === selectedClub.id
          ? {
              ...club,
              books: [
                ...club.books,
                {
                  id: `book-${Date.now()}`,
                  title: book.title,
                  author: book.author || '',
                  status: 'queued',
                },
              ],
            }
          : club
      )
    )
  }

  function handleAddMessageToSelected(text) {
    if (!selectedClub) return
    const msg = {
      id: `msg-${Date.now()}`,
      user: 'You',
      text,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
    }

    setUserClubs((prev) =>
      prev.map((club) =>
        club.id === selectedClub.id
          ? { ...club, messages: [...club.messages, msg] }
          : club
      )
    )
  }

  return (
    <div
      className={`min-h-screen ${colors.ink}`}
      style={{
        fontFamily: '"Press Start 2P", system-ui, ui-sans-serif, sans-serif',
      }}
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
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Story Mode logo"
              className="w-12 h-12 border-4 border-black rounded-xl shadow-chunky"
            />
            <span className="text-xl sm:text-2xl font-extrabold tracking-widest">
              Story Mode
            </span>
          </a>
          <nav className="hidden sm:flex items-center gap-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#clubs">Clubs</NavLink>
            <NavLink href="#my-clubs">My Clubs</NavLink>
            <PixelButton onClick={() => goToMyClubs(true)}>
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
              An 8-bit, 80s-inspired home for readers. Create pixel-perfect
              clubs, vote on the next read, and chat like it&apos;s 1989 —
              minus the dial-up.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <PixelButton onClick={() => goToMyClubs(true)}>
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
              <img
                src="/logo.png"
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
        subtitle="Everything you need to run a club — wrapped in a cozy retro shell."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Trending clubs (read-only) */}
      <Section id="clubs" title="Trending clubs">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingClubs.map((c) => (
            <ClubCard
              key={c.name}
              name={c.name}
              genre={c.genre}
              members={c.members}
            />
          ))}
        </div>
      </Section>

      {/* Your clubs (interactive demo) */}
      <Section
        id="my-clubs"
        title="Your clubs"
        subtitle="All your clubs in one place."
      >
        <div className="grid lg:grid-cols-[1fr,2fr] gap-6 items-start">
          {/* left: list + create form */}
          <div className="space-y-4">
            <PixelCard>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-sm sm:text-base">
                  Your clubs
                </h3>
                <PixelButton
                  type="button"
                  className="bg-amber-300 text-zinc-900"
                  onClick={() => setShowCreateForm(true)}
                >
                  + New club
                </PixelButton>
              </div>

              <div className="space-y-2 text-[11px] sm:text-xs">
                {userClubs.length === 0 && (
                  <p className="text-zinc-700">
                    You don&apos;t have any clubs yet. Hit &quot;New
                    club&quot; to start one.
                  </p>
                )}

                {userClubs.map((club) => (
                  <button
                    key={club.id}
                    type="button"
                    onClick={() => setSelectedClubId(club.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl border-2 border-black bg-amber-50 flex items-center justify-between gap-3 ${
                      club.id === selectedClubId
                        ? 'outline outline-2 outline-green-500'
                        : ''
                    }`}
                  >
                    <div>
                      <p className="font-bold">{club.name}</p>
                      <p className="text-[10px] text-zinc-700">{club.genre}</p>
                    </div>
                    <span className="text-[9px] uppercase tracking-wide">
                      {club.books.length} books
                    </span>
                  </button>
                ))}
              </div>
            </PixelCard>

            {showCreateForm && (
              <CreateClubForm
                onCreate={handleCreateClub}
                onCancel={() => setShowCreateForm(false)}
              />
            )}
          </div>

          {/* right: detail / books / chat */}
          <ClubDetail
            club={selectedClub}
            onAddBook={handleAddBookToSelected}
            onAddMessage={handleAddMessageToSelected}
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
