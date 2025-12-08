import { useEffect, useState } from 'react'
import { listUserClubs, createClub } from './lib/api'
import { useUser } from './lib/useUser'
import PixelButton from './components/PixelButton.jsx'
import PixelCard from './components/PixelCard.jsx'
import ClubCard from './components/ClubCard.jsx'

export default function ClubsPage() {
  const { userId, user, token, loading: userLoading, error: userError } = useUser()
  const [clubs, setClubs] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function refresh(jwt) {
    if (!jwt) return
    try {
      const data = await listUserClubs(jwt)
      setClubs(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setClubs([])
    }
  }

  useEffect(() => {
    if (token) refresh(token)
  }, [token])

  async function onCreate(e) {
    e.preventDefault()
    if (!token) return
    setLoading(true)
    try {
      await createClub(token, { name: name.trim(), description: description.trim() })
      setName('')
      setDescription('')
      await refresh(token)
    } catch (e) {
      console.error(e)
      alert(e.message || 'Failed to create club')
    } finally {
      setLoading(false)
    }
  }

  if (userLoading) return <div className="text-sm text-zinc-700">Loading your account…</div>
  if (userError) return <div className="text-sm text-red-700">Failed to load user. Check console.</div>
  if (!token) return <div className="text-sm text-zinc-700">Please log in to view and manage book clubs.</div>

  return (
    <div className="grid gap-6">
      <PixelCard>
        <form onSubmit={onCreate} className="grid sm:grid-cols-[1fr,1fr,auto] gap-3 items-end">
          <div>
            <label className="block text-xs font-bold mb-1">Club name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-2 border-black rounded bg-amber-50"
              placeholder="e.g. Cozy Fantasy Corner"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border-2 border-black rounded bg-amber-50"
              placeholder="What are you reading?"
            />
          </div>
          <PixelButton type="submit" disabled={loading || !name.trim()}>
            {loading ? 'Creating…' : 'Create Club'}
          </PixelButton>
        </form>
      </PixelCard>

      <PixelCard>
        <h2 className="font-extrabold mb-3">
          {user ? `Clubs for ${user.name}` : 'Your clubs'}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map((c, index) => (
            <ClubCard
              key={index}
              name={c.club_name}
              genre={c.description || 'Book club'}
              // TODO: fetch real member count
              members={1}
            />
          ))}
          {clubs.length === 0 && (
            <div className="text-sm text-zinc-700 col-span-full">
              No clubs yet. Create one above to get started.
            </div>
          )}
        </div>
      </PixelCard>
    </div>
  )
}
