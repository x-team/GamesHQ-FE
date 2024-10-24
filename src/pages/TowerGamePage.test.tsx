import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TowerGamePage from '../pages/TowerGamePage'
import * as api from '../api/admin'
import Swal from 'sweetalert2'

// Mock the API functions
jest.mock('../api/admin')
jest.mock('sweetalert2')
jest.mock('react-spinners', () => ({
  SyncLoader: () => <div data-testid="sync-loader" />
}))

const mockCurrentTowerGame: IGameWithTower = {
  name: 'Test Tower',
  _tower: {
    isOpen: false,
    lunaPrize: 100,
    coinPrize: 200,
    height: 15,
    _gameId: 0
  },
  isActive: false,
  startedAt: '',
  endedAt: '',
  _gameTypeId: 0,
  _arena: {
    hasZoneDeactivation: false,
    teamBased: false,
    ringSystemAlgorithm: '',
    currentRingDeactivation: 0,
    inactiveZonePenaltyPower: 0,
    _gameId: 0
  },
  _arenaPlayers: [
    {
      _user: {
        displayName: 'Player 1',
        email: 'player1@example.com',
        slackId: 'player1',
        profilePictureUrl: 'https://example.com/player1.jpg',
        _team: {
          name: 'Team 1',
          emoji: 'a',
          health: 100,
          isActive: true
        }
      },
      health: 100,
      isSpectator: false,
      isVisible: true,
      isBoss: false,
      luckBoost: 0,
      abilitiesJSON: {},
      _team: {
        name: 'Team 1',
        emoji: 'a',
        health: 100,
        isActive: true
      },
      _weapons: [],
      _userId: 1,
      _teamId: 1,
      _gameId: 1,
      _arenaZoneId: null
    }
  ]
}

describe('TowerGamePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <TowerGamePage />
      </BrowserRouter>
    )
    expect(screen.getByText('TOWER GAME')).toBeInTheDocument()
    expect(screen.getByTestId('sync-loader')).toBeInTheDocument()
  })

  test('renders no active tower game message when there is no current game', async () => {
    ;(api.getCurrentTowerGameStatus as jest.Mock).mockResolvedValue(null)

    render(
      <BrowserRouter>
        <TowerGamePage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(
        screen.getByText(
          'No active tower game at the moment. Create one below.'
        )
      ).toBeInTheDocument()
    })
  })

  test('renders current tower game information when a game exists', async () => {
    ;(api.getCurrentTowerGameStatus as jest.Mock).mockResolvedValue(
      mockCurrentTowerGame
    )

    render(
      <BrowserRouter>
        <TowerGamePage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(
        screen.getByText(`Active Tower: ${mockCurrentTowerGame.name}`)
      ).toBeInTheDocument()
      expect(screen.getByText('TOWER IS CLOSED')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument() // Luna prize
      expect(screen.getByText('200')).toBeInTheDocument() // Coin prize
      expect(screen.getByText('15')).toBeInTheDocument() // Height
    })
  })

  test('opens the tower when "Open the Tower!" button is clicked', async () => {
    ;(api.getCurrentTowerGameStatus as jest.Mock).mockResolvedValue(
      mockCurrentTowerGame
    )
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true })

    render(
      <BrowserRouter>
        <TowerGamePage />
      </BrowserRouter>
    )

    await waitFor(() => {
      fireEvent.click(screen.getByText('Open the Tower!'))
    })

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Open the tower to the people?'
      })
    )

    await waitFor(() => {
      expect(api.openOrCloseCurrentTowerGame).toHaveBeenCalledWith(true)
    })
  })

  test('closes the tower when "Close the Tower!" button is clicked', async () => {
    const openTowerGame = {
      ...mockCurrentTowerGame,
      _tower: { ...mockCurrentTowerGame._tower, isOpen: true }
    }
    ;(api.getCurrentTowerGameStatus as jest.Mock).mockResolvedValue(
      openTowerGame
    )
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true })

    render(
      <BrowserRouter>
        <TowerGamePage />
      </BrowserRouter>
    )

    await waitFor(() => {
      fireEvent.click(screen.getByText('Close the Tower!'))
    })

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Close the tower to the people?'
      })
    )

    await waitFor(() => {
      expect(api.openOrCloseCurrentTowerGame).toHaveBeenCalledWith(false)
    })
  })

  test('ends the current game when "End Game" button is clicked', async () => {
    ;(api.getCurrentTowerGameStatus as jest.Mock).mockResolvedValue(
      mockCurrentTowerGame
    )
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true })

    render(
      <BrowserRouter>
        <TowerGamePage />
      </BrowserRouter>
    )

    await waitFor(() => {
      fireEvent.click(screen.getByText('End Game'))
    })

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Are you sure you want to end the current tower game?'
      })
    )

    await waitFor(() => {
      expect(api.endCurrentTowerGame).toHaveBeenCalled()
    })
  })
})
