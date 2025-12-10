const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1'

async function handle(res) {
	const text = await res.text()
	if (!res.ok) {
		throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
	}
	return text ? JSON.parse(text) : null
}

// ---------- AUTH ----------

export async function registerUser(user_name, password) {
	const res = await fetch(`${BASE_URL}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ user_name, password })
	})
	return handle(res) // returns created user (UserOut)
}

export async function loginUser(username, password) {
	const body = new URLSearchParams()
	body.set('username', username)
	body.set('password', password)

	const res = await fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	})
	return handle(res) // { access_token, token_type }
}

export async function getCurrentUser(token) {
	const res = await fetch(`${BASE_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return handle(res) // UserFormat
}

export async function listUserClubs(token) {
	const res = await fetch(`${BASE_URL}/users/me/bookclubs`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return handle(res)
}

// ---------- BOOK CLUBS ----------

export async function listClubs(token) {
	const res = await fetch(`${BASE_URL}/bookclubs`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return handle(res)
}

export async function createClub(token, payload) {
	const res = await fetch(`${BASE_URL}/bookclubs`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			name: payload.name,
			description: payload.description ?? ''
		})
	})
	return handle(res)
}

export async function joinClub(token, clubId) {
	const res = await fetch(`${BASE_URL}/bookclubs/${clubId}/join`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return handle(res)
}

export async function leaveClub(token, clubId) {
	const res = await fetch(`${BASE_URL}/bookclubs/${clubId}/leave`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return handle(res)
}

export async function deleteClub(token, clubId) {
	const res = await fetch(`${BASE_URL}/bookclubs/${clubId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return handle(res)
}

// ---------- CLUB DETAIL + BOOKS ----------

// basic club metadata + member_count
export async function getClubDetails(clubId) {
	const res = await fetch(`${BASE_URL}/bookclubs/${clubId}`)
	return handle(res) // BookClubDetailOut
}

// all books for a club (requires auth)
export async function listBooksForClub(token, clubId) {
	const res = await fetch(`${BASE_URL}/books/${clubId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return handle(res) // BookOut[]
}

// add a book to a club
export async function addBookToClub(token, clubId, payload) {
	const res = await fetch(`${BASE_URL}/books/${clubId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			title: payload.title,
			author: payload.author ?? ''
		})
	})
	return handle(res) // BookOut
}

// toggle a book between "reading" and "finished" (owner only)
export async function toggleBookStatus(token, clubId, bookId) {
	const res = await fetch(`${BASE_URL}/books/${clubId}/books/${bookId}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return handle(res)
}

// delete a book from a club (owner only)
export async function deleteBookFromClub(token, clubId, bookId) {
	const res = await fetch(`${BASE_URL}/books/${clubId}/${bookId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return handle(res)
}

// update a club's name / description (owner only)
export async function updateClub(token, clubId, payload) {
	const res = await fetch(`${BASE_URL}/bookclubs/${clubId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			name: payload.name,
			description: payload.description
		})
	})
	return handle(res) // BookClubDetailOut
}

// ---------- CLUB MESSAGES (CHAT) ----------

export async function listMessagesForClub(clubId) {
	const res = await fetch(`${BASE_URL}/bookclubs/${clubId}/messages`)
	return handle(res)
}

export async function addMessageToClub(token, clubId, payload) {
	const res = await fetch(`${BASE_URL}/bookclubs/${clubId}/messages`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			content: payload.content
		})
	})
	return handle(res)
}
