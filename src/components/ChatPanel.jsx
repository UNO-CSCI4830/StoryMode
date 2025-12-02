// src/components/ChatPanel.jsx
import React, { useState, useRef, useEffect } from 'react'
import PixelCard from './PixelCard.jsx'
import PixelButton from './PixelButton.jsx'
import { MessageSquare } from 'lucide-react'

export default function ChatPanel({ messages, onAddMessage }) {
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim()) return
    onAddMessage(input)
    setInput('')
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  return (
    <PixelCard className="bg-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4" />
        <h3 className="font-extrabold text-sm sm:text-base">Club chat</h3>
      </div>

      <div
        ref={listRef}
        className="mb-3 max-h-60 overflow-auto pr-1 rounded-xl border-2 border-black bg-amber-50"
      >
        {messages.length === 0 && (
          <p className="text-[11px] sm:text-xs text-zinc-700 px-3 py-3">
            No messages yet. Say hi and kick off the discussion!
          </p>
        )}
        <div className="flex flex-col gap-2 px-3 py-3 text-[11px] sm:text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`px-3 py-2 rounded-xl border-2 border-black bg-white ${
                m.user === 'You' ? 'self-end' : 'self-start'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="font-bold">{m.user}</span>
                <span className="text-[9px] text-zinc-600">{m.timestamp}</span>
              </div>
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-[11px] sm:text-xs">
        <label className="font-bold">Send a message</label>
        <textarea
          rows={2}
          className="w-full px-3 py-2 rounded-xl border-2 border-black bg-amber-50 outline-none resize-none"
          placeholder="What did you think of that last chapter?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-end">
          <PixelButton type="submit">Send</PixelButton>
        </div>
      </form>
    </PixelCard>
  )
}
