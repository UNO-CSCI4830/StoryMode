const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1'

async function handle(res){
  const text = await res.text()
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
  return text ? JSON.parse(text) : null
}

export async function createUser(name){
  // generate a client id if server expects one
  const id =
    (crypto && crypto.randomUUID && crypto.randomUUID()) ||
    `uid_${Date.now()}_${Math.floor(Math.random()*1e6)}`

  const url = new URL(`${BASE_URL}/users`)
  // some backends require the query param too
  url.searchParams.set('user_name', name)

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,            // server expects: id
      user_name: name // server expects: user_name
    })
  })
  return handle(res) // return whatever the server sends (id/user_name/etc.)
}

export async function listUsers(){
  const res = await fetch(`${BASE_URL}/users`)
  return handle(res)
}

export async function listClubs(userId){
  const res = await fetch(`${BASE_URL}/bookclubs`, {
    headers: { 'X-User-Id': userId }
  })
  return handle(res)
}

export async function createClub(userId, payload){
  const res = await fetch(`${BASE_URL}/bookclubs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId
    },
    body: JSON.stringify({
      name: payload.name,
      description: payload.description ?? ''
    })
  })
  return handle(res)
}
