import React from 'react'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from '../../App'

describe('Home -> Login navigation)', () => {
  it('navigates to /login when clicking the Log in button on Home', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    )

    const loginBtn = screen.getByRole('button', { name: /Log in/i })
    fireEvent.click(loginBtn)

    // the Login page includes the Username input
    expect(await screen.findByLabelText(/Username/i)).toBeInTheDocument()
  })
})
