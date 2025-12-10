import { useState } from 'react'
import PixelCard from './PixelCard.jsx'
import PixelButton from './PixelButton.jsx'
import { Book } from 'lucide-react'

export default function BookList({
	books,
	onAddBook,
	onToggleBookStatus,
	onDeleteBook,
	canEdit,
}) {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		if (!title.trim()) return
		onAddBook({
			title: title.trim(),
			author: author.trim(),
		})
		setTitle('')
		setAuthor('')
	}

	return (
		<PixelCard>
			<div className="flex items-center gap-2 mb-3">
				<Book className="w-4 h-4" />
				<h3 className="font-extrabold text-sm sm:text-base">Club reading list</h3>
			</div>

			<div className="space-y-2 mb-3 max-h-40 overflow-auto pr-1 text-xs sm:text-sm">
				{books.length === 0 && (
					<p className="text-zinc-700 text-[11px] sm:text-xs">
						No books yet. {canEdit ? 'Add your first pick below.' : 'Owner can add books here.'}
					</p>
				)}
				{books.map((b) => (
					<div
						key={b.id}
						className="px-3 py-2 rounded-xl border-2 border-black bg-amber-50 flex justify-between items-center gap-3"
					>
						<div>
							<p className="font-bold">{b.title}</p>
							<p className="text-[10px] sm:text-xs text-zinc-700">{b.author}</p>
						</div>

						<div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-wide">
							{canEdit && (
								<>
									<button
										type="button"
										onClick={() => onToggleBookStatus && onToggleBookStatus(b.id)}
										className="w-4 h-4 border-2 border-black rounded-[4px] grid place-items-center bg-amber-100 hover:bg-emerald-200"
										aria-label={
											(b.status || 'queued') === 'reading'
												? 'Mark as finished'
												: 'Mark as reading'
										}
									>
										{(b.status || 'queued') === 'finished' && (
											<span className="block w-2 h-2 bg-black" />
										)}
									</button>

									{onDeleteBook && (
										<button
											type="button"
											onClick={() => onDeleteBook(b.id)}
											className="px-2 py-1 rounded-[6px] border-2 border-black bg-red-400 hover:bg-red-500 text-red-900 font-bold tracking-wide"
										>
											Remove
										</button>
									)}
								</>
							)}
							<span>{(b.status || 'queued').toUpperCase()}</span>
						</div>
					</div>
				))}
			</div>

			{canEdit && (
				<form
					onSubmit={handleSubmit}
					className="space-y-2 text-[11px] sm:text-xs pt-2 border-t-2 border-dashed border-black"
				>
					<p className="font-bold">Add a book</p>
					<input
						className="w-full px-3 py-2 rounded-xl border-2 border-black bg-amber-50 outline-none"
						placeholder="Book title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<input
						className="w-full px-3 py-2 rounded-xl border-2 border-black bg-amber-50 outline-none"
						placeholder="Author"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
					<div className="flex justify-end pt-1">
						<PixelButton type="submit">Add book</PixelButton>
					</div>
				</form>
			)}
		</PixelCard>
	)
}
