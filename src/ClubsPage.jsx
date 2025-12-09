import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
	const [loadError, setLoadError] = useState(null)
	const navigate = useNavigate()

	async function refresh(jwt) {
		if (!jwt) return
		try {
			setLoadError(null)
			const data = await listUserClubs(jwt)
			setClubs(Array.isArray(data) ? data : [])
		} catch (e) {
			console.error('Failed to load clubs', e)
			setLoadError(e)
			setClubs([])
		}
	}

	useEffect(() => {
		if (token) refresh(token)
	}, [token])

	async function onCreate(e) {
		e.preventDefault()
		if (!token) return

		const trimmedName = name.trim()
		const trimmedDescription = description.trim()
		if (!trimmedName) return

		setLoading(true)
		try {
			await createClub(token, {
				name: trimmedName,
				description: trimmedDescription
			})
			setName('')
			setDescription('')
			await refresh(token)
		} catch (e) {
			console.error('Failed to create club', e)
			alert(e.message || 'Failed to create club')
		} finally {
			setLoading(false)
		}
	}

	if (userLoading) {
		return (
			<div className="text-sm text-zinc-700 p-6">
				Loading your account…
			</div>
		)
	}

	if (userError) {
		return (
			<div className="text-sm text-red-700 p-6">
				Failed to load user. Check console.
			</div>
		)
	}

	if (!token) {
		return (
			<div className="min-h-screen bg-amber-100 flex items-center justify-center">
				<PixelCard>
					<p className="mb-4 text-sm text-zinc-800">
						Please log in to view and manage book clubs.
					</p>
					<div className="flex gap-3">
						<PixelButton onClick={() => navigate('/login')}>Log in</PixelButton>
						<PixelButton onClick={() => navigate('/')}>Back home</PixelButton>
					</div>
				</PixelCard>
			</div>
		)
	}

	const displayName = user ? (user.name || user.user_name || 'You') : 'You'

	return (
		<div className="min-h-screen bg-amber-100">
			<div className="max-w-5xl mx-auto px-4 py-8 grid gap-6">
				<header className="flex items-center justify-between">
					<h1 className="text-2xl font-black">
						{userId
							? `${displayName}'s book clubs`
							: 'Your book clubs'}
					</h1>
					<PixelButton type="button" onClick={() => navigate('/')}>
						Back to home
					</PixelButton>
				</header>

				<PixelCard>
					<h2 className="font-extrabold mb-3">Create a new club</h2>
					<form
						onSubmit={onCreate}
						className="grid sm:grid-cols-[1fr,1fr,auto] gap-3 items-end"
					>
						<div>
							<label className="block text-xs font-bold mb-1">Club name</label>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full p-2 border-2 border-black rounded bg-amber-50"
								placeholder="My Cozy Book Club"
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
						{user ? `Clubs for ${displayName}` : 'Your clubs'}
					</h2>

					{loadError && (
						<div className="text-sm text-red-700 mb-3">
							Failed to load clubs. Check console.
						</div>
					)}

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{clubs.map((c, index) => {
							const clubId = c.id || c.club_id || c.clubId || index
							const clubName = c.name || c.club_name || 'Untitled club'
							const desc = c.description || 'Book club'
							const members =
								c.member_count ??
								c.members_count ??
								(Array.isArray(c.members) ? c.members.length : 1)

							return (
								<ClubCard
									key={clubId}
									name={clubName}
									genre={desc}
									members={members}
									onOpen={() => navigate(`/clubs/${clubId}`)}
								/>
							)
						})}

						{clubs.length === 0 && !loadError && (
							<div className="text-sm text-zinc-700 col-span-full">
								No clubs yet. Create one above to get started.
							</div>
						)}
					</div>
				</PixelCard>
			</div>
		</div>
	)
}
