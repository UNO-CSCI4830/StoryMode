import PixelCard from './PixelCard.jsx'
import BookList from './BookList.jsx'
import ChatPanel from './ChatPanel.jsx'
import PixelButton from './PixelButton.jsx'

export default function ClubDetail({
  club,
  onAddBook,
  onAddMessage,
  canEdit,
  onToggleBookStatus,
  onEditClub,
}) {
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
      {/* Left column: club info + reading list */}
      <div className="space-y-4">
        {/* Club header card */}
        <PixelCard>
          <h3 className="font-extrabold text-base sm:text-lg mb-1">
            {club.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-700 mb-1">
            {club.genre}
          </p>
          <p className="text-[11px] sm:text-xs text-zinc-800 mb-2">
            {club.vibe}
          </p>

          {canEdit && (
            <div className="flex justify-end pt-1">
              <PixelButton type="button" onClick={onEditClub}>
                Edit club
              </PixelButton>
            </div>
          )}
        </PixelCard>

        {/* Reading list */}
        <BookList
          books={club.books || []}
          onAddBook={onAddBook}
          onToggleBookStatus={onToggleBookStatus}
          canEdit={canEdit}
        />
      </div>

      {/* Right column: chat */}
      <ChatPanel
        messages={club.messages || []}
        onAddMessage={onAddMessage}
      />
    </div>
  )
}