import { useEffect, useState } from 'react'
import { getCurrentUser } from './api'

export function useUser() {
	const [userId, setUserId] = useState(null)
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const savedToken = localStorage.getItem('storymode_token')

		if (!savedToken) {
			setLoading(false)
			return
		}

		let cancelled = false

			; (async () => {
				try {
					setLoading(true)
					setError(null)

					const u = await getCurrentUser(savedToken)

					if (cancelled) return

					const id = u?.id || u?.user_id || u?._id
					const uname = u?.user_name || u?.name
					if (!id) throw new Error('User id missing from response')

					// keep cache, but only after backend has confirmed the token
					localStorage.setItem('storymode_user_id', id)
					localStorage.setItem('storymode_user_name', uname)

					setToken(savedToken)
					setUserId(id)
					setUser({ id, name: uname })
				} catch (e) {
					console.error(e)
					if (!cancelled) {
						setError(e)
						// invalid token or server error → clear everything
						localStorage.removeItem('storymode_token')
						localStorage.removeItem('storymode_user_id')
						localStorage.removeItem('storymode_user_name')
						setToken(null)
						setUserId(null)
						setUser(null)
					}
				} finally {
					if (!cancelled) {
						setLoading(false)
					}
				}
			})()
		return () => {
			cancelled = true
		}
	}, [])

	return { userId, user, token, loading, error }
}
