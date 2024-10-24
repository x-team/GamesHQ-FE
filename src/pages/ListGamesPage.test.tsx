import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import Swal from 'sweetalert2'
import ListGamesPage from './ListGamesPage'
import { getGameTypes, deleteGameType } from '../api/gamedev'

// Mock the modules
jest.mock('../api/gamedev')
jest.mock('sweetalert2')
jest.mock('react-spinners', () => ({
  SyncLoader: () => <div data-testid="sync-loader">Loading...</div>
}))

// Mock data
const mockGames = [
  {
    id: '1',
    name: 'Game 1',
    clientSecret: 'secret1'.repeat(10),
    signingSecret: 'signing1'.repeat(10)
  },
  {
    id: '2',
    name: 'Game 2',
    clientSecret: 'secret2'.repeat(10),
    signingSecret: 'signing2'.repeat(10)
  }
]

describe('ListGamesPage', () => {
  beforeEach(() => {
    ;(getGameTypes as jest.Mock).mockResolvedValue(mockGames)
  })

  test('renders the component and fetches games', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ListGamesPage />
        </MemoryRouter>
      )
    })

    expect(screen.getByText('MY GAMES')).toBeInTheDocument()
    expect(screen.getByText('New Game')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument()
      expect(screen.getByText('Game 2')).toBeInTheDocument()
    })
  })

  test('displays loading state', async () => {
    ;(getGameTypes as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockGames), 100))
    )

    render(
      <MemoryRouter>
        <ListGamesPage />
      </MemoryRouter>
    )

    expect(screen.getByTestId('sync-loader')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId('sync-loader')).not.toBeInTheDocument()
    })
  })

  test('displays error message when fetching games fails', async () => {
    const errorMessage = 'Failed to fetch games'
    ;(getGameTypes as jest.Mock).mockRejectedValue(new Error(errorMessage))

    await act(async () => {
      render(
        <MemoryRouter>
          <ListGamesPage />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  test('deletes a game when confirmed', async () => {
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true })
    ;(deleteGameType as jest.Mock).mockResolvedValue({})

    await act(async () => {
      render(
        <MemoryRouter>
          <ListGamesPage />
        </MemoryRouter>
      )
    })

    const deleteButtons = await screen.findAllByText('DELETE')
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Delete game 1?',
          icon: 'warning',
          showCancelButton: true
        })
      )
      expect(deleteGameType).toHaveBeenCalledWith('1')
      expect(getGameTypes).toHaveBeenCalledTimes(2) // Initial load + after delete
    })
  })

  test('does not delete a game when cancelled', async () => {
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: false })

    await act(async () => {
      render(
        <MemoryRouter>
          <ListGamesPage />
        </MemoryRouter>
      )
    })

    const deleteButtons = await screen.findAllByText('DELETE')
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled()
      expect(deleteGameType).not.toHaveBeenCalled()
      expect(getGameTypes).toHaveBeenCalledTimes(1) // Only initial load
    })
  })

  test('renders game details correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ListGamesPage />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument()
      expect(screen.getByText('Game 2')).toBeInTheDocument()
      expect(screen.getAllByText('CLIENT SECRET')).toHaveLength(2)
      expect(screen.getAllByText('SIGNING SECRET')).toHaveLength(2)
    })
  })
})
