import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../../App.jsx'

describe('App', () => {
  it('renders the hero heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /build rad, retro bookclubs/i })
    ).toBeInTheDocument()
  })

  it('renders the trending clubs section', () => {
    render(<App />)

    // 👇 use the heading role so we only match the section title
    const trendingHeading = screen.getByRole('heading', {
      name: /trending clubs/i,
      level: 2, // optional but nice if your h2 is used
    })

    expect(trendingHeading).toBeInTheDocument()
  })
})
