import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClubCard from '../ClubCard.jsx'

describe('ClubCard', () => {
  it('shows club name, genre, and members', () => {
    render(<ClubCard name="Test Club" genre="Sci-Fi" members={42} />)

    expect(screen.getByText('Test Club')).toBeInTheDocument()
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders a "View club" button', () => {
    render(<ClubCard name="Test Club" genre="Sci-Fi" members={42} />)

    expect(
      screen.getByRole('button', { name: /view club/i })
    ).toBeInTheDocument()
  })
})
