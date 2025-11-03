import { useEffect, useState } from 'react'
import { listClubs, createClub } from './lib/api'
import { useUser } from './lib/useUser'
import PixelButton from './components/PixelButton.jsx'
import PixelCard from './components/PixelCard.jsx'
import ClubCard from './components/ClubCard.jsx'

export default function ClubsPage(){
  const { userId, user, loading: userLoading, error: userError } = useUser()
  const [clubs, setClubs] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function refresh(uid){
    if(!uid) return
    try {
      const data = await listClubs(uid)
      setClubs(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setClubs([])
    }
  }

  useEffect(() => { if (userId) refresh(userId) }, [userId])

  async function onCreate(e){
    e.preventDefault()
    if(!userId) return
    setLoading(true)
    try {
      await createClub(userId, { name: name.trim(), description: description.trim() })
      setName('')
      setDescription('')
      await refresh(userId)
    } catch (e) {
      console.error(e)
      alert(e.message || 'Failed to create club')
    } finally {
      setLoading(false)
    }
  }

  if (userLoading) return <div className="text-sm text-zinc-700">Initializing user…</div>
  if (userError) return <div className="text-sm text-red-700">Failed to init user. Check console.</div>

  return (
    <div className="grid gap-6">
      <PixelCard>
        <form onSubmit={onCreate} className="grid sm:grid-cols-[1fr,1fr,auto] gap-3 items-end">
          <div>
            <label className="block text-xs font-bold mb-1">Club name</label>
            <input className="w-full border-4 border-black rounded-xl px-3 py-2"
              placeholder="e.g., Synthwave Sci-Fi" value={name}
              onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Description (optional)</label>
            <input className="w-full border-4 border-black rounded-xl px-3 py-2"
              placeholder="What’s this club about?" value={description}
              onChange={e=>setDescription(e.target.value)} />
          </div>
          <PixelButton type="submit" disabled={loading || !userId} className="h-[42px]">
            {loading ? 'Creating…' : 'Create club'}
          </PixelButton>
        </form>
        <div className="mt-2 text-xs text-zinc-600">Signed in as <strong>{user?.name}</strong></div>
      </PixelCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.length === 0 && (
          <div className="text-sm text-zinc-700">No clubs yet. Create your first one above.</div>
        )}
        {clubs.map((c, i) => (
          <ClubCard key={c.id ?? i} name={c.name} genre={c.description || '—'} members={0} />
        ))}
      </div>
    </div>
  )
}
