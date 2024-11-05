import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SignInPage from './SignInPage'
import useCurrentUser from '../hooks/useCurrentUser'
import { handleLogoutClick } from '../helpers/signInAndOutHelper'

// Mock the custom hook and helper function
jest.mock('../hooks/useCurrentUser')
jest.mock('../helpers/signInAndOutHelper')

// Mock the useNavigate hook
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('SignInPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders sign in page when not authenticated', () => {
    ;(useCurrentUser as jest.Mock).mockReturnValue({
      authenticated: false,
      isAdmin: false,
      getCurrentUser: jest.fn(),
      eraseUser: jest.fn()
    })

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    )

    expect(screen.getByText('GAMES HQ - SIGN IN')).toBeInTheDocument()
    expect(screen.getByText('Login with XTU')).toBeInTheDocument()
  })

  test('renders unauthorized message for non-admin authenticated users', async () => {
    ;(useCurrentUser as jest.Mock).mockReturnValue({
      authenticated: true,
      isAdmin: false,
      getCurrentUser: jest.fn(),
      eraseUser: jest.fn()
    })

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('UNAUTHORIZED')).toBeInTheDocument()
      expect(
        screen.getByText(
          "You must be an admin to access GamesHQ's Admin Panel currently."
        )
      ).toBeInTheDocument()
      expect(screen.getByText('Log out')).toBeInTheDocument()
    })
  })

  test('navigates to home page for authenticated admin users', () => {
    ;(useCurrentUser as jest.Mock).mockReturnValue({
      authenticated: true,
      isAdmin: true,
      getCurrentUser: jest.fn(),
      eraseUser: jest.fn()
    })

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    )

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  test('handles login click', async () => {
    ;(useCurrentUser as jest.Mock).mockReturnValue({
      authenticated: false,
      isAdmin: false,
      getCurrentUser: jest.fn(),
      eraseUser: jest.fn()
    })

    const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => null)
    const mockAddEventListener = jest.spyOn(window, 'addEventListener')

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Login with XTU'))

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('/general/login/google'),
      'popup',
      'width=600,height=600,scrollbars=no,resizable=no'
    )
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function)
    )
  })

  test('handles logout click', async () => {
    ;(useCurrentUser as jest.Mock).mockReturnValue({
      authenticated: true,
      isAdmin: false,
      getCurrentUser: jest.fn(),
      eraseUser: jest.fn()
    })
    ;(handleLogoutClick as jest.Mock).mockResolvedValue(undefined)

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(screen.getByText('Log out'))
    })

    expect(handleLogoutClick).toHaveBeenCalled()
  })
})
