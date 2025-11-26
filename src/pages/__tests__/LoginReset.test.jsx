import React from 'react'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Login from '../Login'

describe('Login Reset button', () => {
  it('clears inputs and state when Reset is clicked', () => {
    render(<Login />)
    const nameInput = screen.getByLabelText(/Username/i)
    const passwordInput = screen.getByLabelText(/Password/i)
    const resetBtn = screen.getByRole('button', { name: /Reset/i })

    fireEvent.change(nameInput, { target: { value: 'name123' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(nameInput).toHaveValue('name123')
    expect(passwordInput).toHaveValue('password123')

    fireEvent.click(resetBtn)

    expect(nameInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    // success message should not be present after reset
    expect(screen.queryByText(/Login simulated/i)).not.toBeInTheDocument()
  })
})
