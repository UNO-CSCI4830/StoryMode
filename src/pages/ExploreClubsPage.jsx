import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../lib/useUser'
import { listClubs, joinClub } from '../lib/api'
import PixelCard from '../components/PixelCard.jsx'
import PixelButton from '../components/PixelButton.jsx'
import ClubCard from '../components/ClubCard.jsx'

export default function ExploreClubsPage() {
  const { user, token, loading: userLoading, error: userError } = useUser()
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [joiningId, setJoiningId] = useState(null)
  const navigate = useNavigate()

  async function loadClubs(currentToken) {
    setLoading(true)
    setError(null)
    try {
      const all = await listClubs(currentToken)
      setClubs(Array.isArray(all) ? all : [])
    } catch (e) {
      console.error('Failed to load clubs', e)
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) loadClubs(token)
  }, [token])

  async function handleJoin(clubId) {
    if (!token) return
    setJoiningId(clubId)
    try {
      await joinClub(token, clubId)
      alert('Joined club! You should now see it under My clubs.')
      await loadClubs(token)
    } catch (e) {
      console.error('Failed to join club', e)
      alert(e.message || 'Failed to join club')
    } finally {
      setJoiningId(null)
    }
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-amber-100 flex items-center justify-center">
        <span className="text-sm text-zinc-700">Loading…</span>
      </div>
    )
  }

  if (userError || !token) {
    return (
      <div className="min-h-screen bg-amber-100 flex items-center justify-center">
        <PixelCard>
          <p className="mb-4 text-sm text-zinc-800">
            Please log in to explore and join book clubs.
          </p>
          <PixelButton onClick={() => navigate('/login')}>Log in</PixelButton>
        </PixelCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-100">
      <div className="max-w-5xl mx-auto px-4 py-8 grid gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-black">Explore clubs</h1>
          <div className="flex gap-3">
            <PixelButton onClick={() => navigate('/clubs')}>My clubs</PixelButton>
            <PixelButton onClick={() => navigate('/')}>Home</PixelButton>
          </div>
        </header>

        <PixelCard>
          <h2 className="font-extrabold mb-3">All book clubs</h2>

          {error && (
            <p className="text-sm text-red-700 mb-3">
              Failed to load clubs. Check the console for details.
            </p>
          )}
          {loading && !error && (
            <p className="text-sm text-zinc-700 mb-3">Loading clubs…</p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {clubs.map((c) => {
              const id = c.id || c.club_id
              const name = c.name || c.club_name || 'Untitled club'
              const desc = c.description || 'Book club'
              const members =
                c.member_count ??
                (Array.isArray(c.members) ? c.members.length : 1)

              return (
                <ClubCard
                  key={id}
                  name={name}
                  genre={desc}
                  members={members}
                  buttonLabel={joiningId === id ? 'Joining…' : 'Join club'}
                  onOpen={() => handleJoin(id)}
                />
              )
            })}

            {!loading && !error && clubs.length === 0 && (
              <div className="text-sm text-zinc-700 col-span-full">
                No clubs exist yet.
              </div>
            )}
          </div>
        </PixelCard>
      </div>
    </div>
  )
}
