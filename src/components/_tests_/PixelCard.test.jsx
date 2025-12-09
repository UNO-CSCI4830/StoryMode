import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PixelCard from '../PixelCard.jsx'

describe('PixelCard', () => {
  it('renders its children', () => {
    render(
      <PixelCard>
        <p>Inside card</p>
      </PixelCard>
    )

    expect(screen.getByText('Inside card')).toBeInTheDocument()
  })

  it('applies border and pixelated style', () => {
  render(<PixelCard>Card content</PixelCard>)

  const content = screen.getByText('Card content')
  const card = content.closest('div')

  expect(card).toHaveClass('border-4')
  expect(card.style.imageRendering).toBe('pixelated')
})

})
