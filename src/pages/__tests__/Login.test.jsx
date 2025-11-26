import React from 'react'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Login from '../Login'

// simple localStorage mock for the tests (jsdom may not provide a usable one)
beforeEach(() => {
  const store = {}
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v) },
      removeItem: (k) => { delete store[k] },
      clear: () => { Object.keys(store).forEach(k => delete store[k]) }
    },
    configurable: true,
  })
})

describe('Login UI', () => {
  it('renders the login heading and form inputs', () => {
    render(<Login />)
    
    expect(screen.getByRole('heading', { name: /Log in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
  })

  it('allows entering a name and simulates login', async () => {
    render(<Login />)
  const nameInput = screen.getByLabelText(/Username/i)
  const loginButtons = screen.getAllByRole('button', { name: /Log in/i })
  const submit = loginButtons.find((b) => b.getAttribute('type') === 'submit')
  expect(submit).toBeTruthy()

  // simulate user typing and submitting
  fireEvent.change(nameInput, { target: { value: 'Test User' } })
  const passwordInput = screen.getByLabelText(/Password/i)
  fireEvent.change(passwordInput, { target: { value: 'hunter2' } })
  fireEvent.click(submit)

    // show success message
    expect(await screen.findByText(/Login successful/i)).toBeInTheDocument()
    // localStorage should have been set
    expect(localStorage.getItem('storymode_user_name')).toBe('Test User')
  })
})
