// src/components/ClubDetail.jsx
import React from 'react'
import PixelCard from './PixelCard.jsx'
import BookList from './BookList.jsx'
import ChatPanel from './ChatPanel.jsx'

export default function ClubDetail({ club, onAddBook, onAddMessage }) {
  if (!club) {
    return (
      <PixelCard>
        <p className="text-xs sm:text-sm">
          Pick a club from the list above to see its details.
        </p>
      </PixelCard>
    )
  }

  return (
    <div className="grid lg:grid-cols-[1.4fr,1.3fr] gap-6 items-start">
      <div className="space-y-4">
        <PixelCard>
          <h3 className="font-extrabold text-base sm:text-lg mb-2">{club.name}</h3>
          <p className="text-[11px] sm:text-xs text-zinc-700 mb-2">{club.genre}</p>
          <p className="text-[11px] sm:text-xs text-zinc-800 mb-2">{club.vibe}</p>
        </PixelCard>

        <BookList books={club.books} onAddBook={onAddBook} />
      </div>

      <ChatPanel messages={club.messages} onAddMessage={onAddMessage} />
    </div>
  )
}
