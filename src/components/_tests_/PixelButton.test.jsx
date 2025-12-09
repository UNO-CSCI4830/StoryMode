import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PixelButton from '../PixelButton.jsx'

describe('PixelButton', () => {
  it('renders its children text', () => {
    render(<PixelButton>Click me</PixelButton>)

    const btn = screen.getByRole('button', { name: /click me/i })
    expect(btn).toBeInTheDocument()
  })

  it('merges extra className with base styles', () => {
    render(<PixelButton className="bg-red-500">Red</PixelButton>)

    const btn = screen.getByRole('button', { name: /red/i })
    expect(btn).toHaveClass('bg-red-500')   // extra class
    expect(btn).toHaveClass('border-4')     // from component base styles
  })
})
