import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../lib/useUser'
import {
    getClubDetails,
    listBooksForClub,
    addBookToClub,
    listMessagesForClub,
    addMessageToClub,
    toggleBookStatus,
    updateClub,
    deleteClub,
    leaveClub,
    deleteBookFromClub
} from '../lib/api'
import PixelButton from '../components/PixelButton.jsx'
import PixelCard from '../components/PixelCard.jsx'
import ClubDetail from '../components/ClubDetail.jsx'

export default function ClubDetailPage() {
    const { clubId } = useParams()
    const navigate = useNavigate()
    const { user, token, loading: userLoading, error: userError } = useUser()

    const [clubMeta, setClubMeta] = useState(null)
    const [books, setBooks] = useState([])
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadError, setLoadError] = useState(null)

    // fetch club + books when user and clubId are ready
    useEffect(() => {
        if (!clubId) return
        if (!token) {
            setLoading(false)
            return
        }

        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setLoadError(null)

                const [meta, bookList] = await Promise.all([
                    getClubDetails(clubId),
                    listBooksForClub(token, clubId)
                ])

                if (cancelled) return
                setClubMeta(meta || null)
                setBooks(Array.isArray(bookList) ? bookList : [])
            } catch (e) {
                console.error('Failed to load club detail', e)
                if (!cancelled) {
                    setLoadError(e)
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        load()

        return () => {
            cancelled = true
        }
    }, [clubId, token])

    useEffect(() => {
        if (!clubId) return

        let cancelled = false

        async function loadMessagesOnce() {
            try {
                const list = await listMessagesForClub(clubId)
                if (cancelled) return

                const uiMessages = (Array.isArray(list) ? list : []).map((m) => ({
                    id: m.id,
                    user: m.user_name,
                    text: m.content,
                    timestamp: new Date(m.created_at).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                    }),
                }))

                setMessages(uiMessages)
            } catch (e) {
                if (cancelled || e.status === 404) return

                console.error('Failed to load messages', e)
            }
        }

        // Load immediately
        loadMessagesOnce()

        // Poll every 5 seconds
        const intervalId = setInterval(loadMessagesOnce, 5000)

        return () => {
            cancelled = true
            clearInterval(intervalId)
        }
    }, [clubId])

    async function handleAddBook(payload) {
        if (!token || !clubId) return
        try {
            const created = await addBookToClub(token, clubId, payload)
            setBooks(prev => [...prev, created])
        } catch (e) {
            console.error('Failed to add book', e)
            alert(e.message || 'Failed to add book')
        }
    }

    async function handleToggleBookStatus(bookId) {
        if (!token || !clubId) return
        try {
            const updated = await toggleBookStatus(token, clubId, bookId)
            setBooks(prev => prev.map(b => (b.id === updated.id ? updated : b)))
        } catch (e) {
            console.error('Failed to update book status', e)
            alert(e.message || 'Failed to update book status')
        }
    }

        async function handleDeleteBook(bookId) {
        if (!token || !clubId) return

        const confirmed = window.confirm(
            'Are you sure you want to remove this book from the club reading list?'
        )
        if (!confirmed) return

        try {
            await deleteBookFromClub(token, clubId, bookId)
            setBooks(prev => prev.filter(b => b.id !== bookId))
        } catch (e) {
            console.error('Failed to delete book', e)
            alert(e.message || 'Failed to remove book')
        }
    }

    async function handleEditClub() {
        if (!token || !clubMeta) return

        const currentName = clubMeta.name || ''
        const currentDesc = clubMeta.description || ''

        const newName = window.prompt('Edit club name:', currentName)
        if (newName === null) return // cancelled
        const trimmedName = newName.trim()
        if (!trimmedName) {
            alert('Name cannot be empty.')
            return
        }

        const newDesc = window.prompt('Edit club description:', currentDesc)
        if (newDesc === null) return

        try {
            const updated = await updateClub(token, clubMeta.id, {
                name: trimmedName,
                description: newDesc,
            })
            setClubMeta(updated)
        } catch (e) {
            console.error('Failed to update club', e)
            alert(e.message || 'Failed to update club')
        }
    }

    async function handleDeleteClub() {
        if (!token || !clubId) return

        const confirmed = window.confirm(
            'Are you sure you want to delete this club? This cannot be undone.'
        )
        if (!confirmed) return

        try {
            await deleteClub(token, clubId)
            navigate('/clubs')
        } catch (e) {
            console.error('Failed to delete club', e)
            alert(e.message || 'Failed to delete club')
        }
    }

    async function handleLeaveClub() {
        if (!token || !clubId) return

        if (isOwner) {
            window.alert(
                'Owners cannot leave their own club. You must delete the club instead.'
            )
            return
        }

        const confirmed = window.confirm('Are you sure you want to leave this club?')
        if (!confirmed) return

        try {
            await leaveClub(token, clubId)
            navigate('/clubs')
        } catch (e) {
            console.error('Failed to leave club', e)
            alert(e.message || 'Failed to leave club')
        }
    }

    async function handleAddMessage(text) {
        if (!token || !clubId) return
        const trimmed = text.trim()
        if (!trimmed) return

        try {
            const created = await addMessageToClub(token, clubId, { content: trimmed })

            const msg = {
                id: created.id,
                user: created.user_name,
                text: created.content,
                timestamp: new Date(created.created_at).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                }),
            }

            // optimistic append; poll will keep us in sync
            setMessages((prev) => [...prev, msg])
        } catch (e) {
            console.error('Failed to send message', e)
            alert(e.message || 'Failed to send message')
        }
    }

    if (userLoading) {
        return (
            <div className="min-h-screen bg-amber-100 flex items-center justify-center">
                <div className="text-sm text-zinc-700">Loading your account…</div>
            </div>
        )
    }

    if (userError || !token) {
        return (
            <div className="min-h-screen bg-amber-100 flex items-center justify-center">
                <PixelCard>
                    <p className="mb-4 text-sm text-zinc-800">
                        You need to be logged in to view a club.
                    </p>
                    <div className="flex gap-3">
                        <PixelButton onClick={() => navigate('/login')}>Log in</PixelButton>
                        <PixelButton onClick={() => navigate('/clubs')}>Back to clubs</PixelButton>
                    </div>
                </PixelCard>
            </div>
        )
    }

    const isOwner = user && clubMeta && clubMeta.owner_id === user.id
    const displayName = user ? (user.user_name || user.name || 'You') : 'You'

    // Shape data for ClubDetail component (expects books + messages arrays)
    const uiClub = clubMeta
        ? {
            id: clubMeta.id,
            name: clubMeta.name || 'Untitled club',
            genre: clubMeta.description || 'Book club',
            vibe: `Owner: ${clubMeta.owner_name} · Members: ${clubMeta.member_count}`,
            books: books || [],
            messages: messages || [],
        }
        : null

    return (
        <div className="min-h-screen bg-amber-100">
            <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black">
                            {uiClub ? uiClub.name : 'Club details'}
                        </h1>
                        <p className="text-xs text-zinc-700">
                            Signed in as {displayName}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <PixelButton type="button" onClick={() => navigate('/clubs')}>
                            Back to clubs
                        </PixelButton>
                        <PixelButton type="button" onClick={() => navigate('/')}>
                            Home
                        </PixelButton>
                    </div>
                </header>

                {loadError && (
                    <PixelCard>
                        <p className="text-sm text-red-700">
                            Failed to load club information. Check the console for details.
                        </p>
                    </PixelCard>
                )}

                {loading && !loadError && (
                    <PixelCard>
                        <p className="text-sm text-zinc-700">Loading club…</p>
                    </PixelCard>
                )}

                {!loading && !loadError && (
                    <ClubDetail
                        club={uiClub}
                        onAddBook={handleAddBook}
                        onAddMessage={handleAddMessage}
                        canEdit={!!isOwner}
                        onToggleBookStatus={handleToggleBookStatus}
                        onDeleteBook={isOwner ? handleDeleteBook : undefined}
                        onEditClub={isOwner ? handleEditClub : undefined}
                        onDeleteClub={isOwner ? handleDeleteClub : undefined}
                        onLeaveClub={handleLeaveClub}
                    />
                )}
            </div>
        </div>
    )
}
