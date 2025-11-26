import React from 'react'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// routing tests
const route_cases = [
  { path: '/login', expected: /Log in/i, name: 'Login page', role: 'heading' },
  { path: '/', expected: /Build rad, retro bookclubs/i, name: 'Home page', role: 'heading' },
]

describe('App routing', () => {
  for (const tc of route_cases) {
    it(`renders ${tc.name} at ${tc.path}`, async () => {
      render(
        <MemoryRouter initialEntries={[tc.path]}>
          <App />
        </MemoryRouter>
      )

      if (tc.role === 'heading') {
        expect(await screen.findByRole('heading', { name: tc.expected })).toBeInTheDocument()
      } else {
        expect(await screen.findByText(tc.expected)).toBeInTheDocument()
      }
    })
  }
})
