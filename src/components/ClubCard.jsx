import React from 'react'
import { Book, Users } from 'lucide-react'
import PixelCard from './PixelCard.jsx'
import PixelButton from './PixelButton.jsx'

export default function ClubCard({
	name,
	genre,
	members,
	onOpen,
	buttonLabel = 'View club',
}) {
	return (
		<PixelCard className="h-full">
			<div className="flex items-center gap-4 mb-4">
				<div className="w-12 h-12 bg-green-400 border-4 border-black rounded-xl grid place-items-center">
					<Book className="w-6 h-6" />
				</div>
				<div>
					<h4 className="font-black text-xl leading-6">{name}</h4>
					<p className="text-zinc-700 text-sm">{genre}</p>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-zinc-800 text-sm">
					<Users className="w-5 h-5" />
					<span className="font-bold">{members}</span>
				</div>
				<PixelButton onClick={onOpen}>{buttonLabel}</PixelButton>
			</div>
		</PixelCard>
	)
}
