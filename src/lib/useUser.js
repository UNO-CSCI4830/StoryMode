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
    const savedId = localStorage.getItem('storymode_user_id')
    const savedName = localStorage.getItem('storymode_user_name')

    if (!savedToken) {
      setLoading(false)
      return
    }

    // If we already have cached user info, trust it
    if (savedId && savedName) {
      setToken(savedToken)
      setUserId(savedId)
      setUser({ id: savedId, name: savedName })
      setLoading(false)
      return
    }

    ;(async () => {
      try {
        setLoading(true)
        const u = await getCurrentUser(savedToken)
        const id = u?.id || u?.user_id || u?._id
        const uname = u?.user_name || u?.name
        if (!id) throw new Error('User id missing from response')

        localStorage.setItem('storymode_user_id', id)
        localStorage.setItem('storymode_user_name', uname)

        setToken(savedToken)
        setUserId(id)
        setUser({ id, name: uname })
      } catch (e) {
        console.error(e)
        setError(e)
        // invalid token → clear everything
        localStorage.removeItem('storymode_token')
        localStorage.removeItem('storymode_user_id')
        localStorage.removeItem('storymode_user_name')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { userId, user, token, loading, error }
}
