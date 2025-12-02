// src/components/CreateClubForm.jsx
import React, { useState } from 'react'
import PixelCard from './PixelCard.jsx'
import PixelButton from './PixelButton.jsx'

export default function CreateClubForm({ onCreate, onCancel }) {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [vibe, setVibe] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    const payload = {
      name: name.trim(),
      genre: genre.trim(),
      vibe: vibe.trim(),
      initialBook: bookTitle.trim()
        ? {
            title: bookTitle.trim(),
            author: bookAuthor.trim(),
          }
        : null,
    }
    onCreate(payload)
    setName('')
    setGenre('')
    setVibe('')
    setBookTitle('')
    setBookAuthor('')
  }

  return (
    <PixelCard className="bg-green-100">
      <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="font-extrabold text-sm sm:text-base">Create a new club</h3>
          <button
            type="button"
            className="text-[10px] sm:text-xs underline font-bold"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>

        <div className="space-y-1">
          <label className="font-bold block text-[10px] sm:text-xs">Club name</label>
          <input
            className="w-full px-3 py-2 rounded-xl border-2 border-black bg-amber-50 outline-none"
            placeholder="e.g., Cozy Night Readers"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold block text-[10px] sm:text-xs">Genre</label>
          <input
            className="w-full px-3 py-2 rounded-xl border-2 border-black bg-amber-50 outline-none"
            placeholder="Mystery, Fantasy, Non-fiction…"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold block text-[10px] sm:text-xs">Vibe (optional)</label>
          <textarea
            className="w-full px-3 py-2 rounded-xl border-2 border-black bg-amber-50 outline-none resize-none"
            rows={2}
            placeholder="Describe the vibe in one line."
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
          />
        </div>

        <div className="pt-2 border-t-2 border-dashed border-black space-y-1">
          <p className="font-bold text-[10px] sm:text-xs">First book (optional)</p>
          <div className="grid sm:grid-cols-2 gap-2">
            <input
              className="w-full px-3 py-2 rounded-xl border-2 border-black bg-amber-50 outline-none"
              placeholder="Book title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
            <input
              className="w-full px-3 py-2 rounded-xl border-2 border-black bg-amber-50 outline-none"
              placeholder="Author"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <PixelButton type="submit">Create club</PixelButton>
        </div>
      </form>
    </PixelCard>
  )
}
