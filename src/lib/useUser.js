import { useEffect, useState } from 'react'
import { createUser } from './api'

export function useUser(){
  const [userId, setUserId] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const savedId = localStorage.getItem('storymode_user_id')
    const savedName = localStorage.getItem('storymode_user_name')

    if (savedId) {
      setUserId(savedId)
      setUser({ id: savedId, name: savedName || 'You' })
      setLoading(false)
      return
    }

    (async () => {
      try {
        setLoading(true)
        const name = 'Guest ' + Math.floor(Math.random() * 10000)
        const u = await createUser(name)
        // be flexible about server keys
        const id = u?.id || u?._id || u?.user_id || u?.uid
        const uname = u?.user_name || u?.name || name
        if (!id) throw new Error('User id missing from response')

        localStorage.setItem('storymode_user_id', id)
        localStorage.setItem('storymode_user_name', uname)
        setUserId(id)
        setUser({ id, name: uname })
      } catch (e) {
        console.error(e)
        setError(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return { userId, user, loading, error }
}
