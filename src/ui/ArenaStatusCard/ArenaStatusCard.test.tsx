import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import ArenaStatusCard from '../ArenaStatusCard'
import { postArenaCommand } from '../../api/admin'
import { ARENA_SLACK_COMMANDS } from '../../helpers/arenaHelper'
import type { IProps as ArenaStatusCardProps } from './ArenaStatusCard'

jest.mock('react-toastify')
jest.mock('../../api/admin')

describe('ArenaStatusCard', () => {
  const defaultProps = {
    onUpdate: jest.fn()
  }

  const mockGame: ArenaStatusCardProps['arenaGame'] = {
    name: 'Test Arena',
    isActive: true,
    _arena: {
      teamBased: false,
      _gameId: 1,
      currentRingDeactivation: 1,
      hasZoneDeactivation: false,
      inactiveZonePenaltyPower: 1,
      ringSystemAlgorithm: '123'
    },
    // @ts-expect-error enough for a test
    _arenaPlayers: [{}, {}],
    _gameTypeId: 1,
    endedAt: '2022-01-03',
    startedAt: '2021-01-03'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders new game button when no game exists', () => {
    render(<ArenaStatusCard {...defaultProps} />)

    expect(screen.getByText('NEW GAME')).toBeInTheDocument()
    expect(screen.getByText('RESTRICT ZONES')).toBeInTheDocument()
  })

  test('renders game controls when game exists', () => {
    render(<ArenaStatusCard {...defaultProps} arenaGame={mockGame} />)

    expect(screen.getByText('Test Arena')).toBeInTheDocument()
    expect(screen.getByText('ACTIVE')).toBeInTheDocument()
    expect(screen.getByText('START ROUND')).toBeInTheDocument()
    expect(screen.getByText('END GAME')).toBeInTheDocument()
    expect(screen.getByText('LIST PLAYERS')).toBeInTheDocument()
    expect(screen.getByText('GIVE WEAPON TO EVERYONE')).toBeInTheDocument()
    expect(screen.getByText('RESTRICT WEAPONS')).toBeInTheDocument()
  })

  test('handles new game command successfully', async () => {
    const successResponse = {
      type: 'response',
      text: 'Game created'
    }

    ;(postArenaCommand as jest.Mock).mockResolvedValueOnce(successResponse)

    render(<ArenaStatusCard {...defaultProps} />)

    fireEvent.click(screen.getByText('NEW GAME'))

    await waitFor(() => {
      expect(postArenaCommand).toHaveBeenCalledWith(
        ARENA_SLACK_COMMANDS.NEW_GAME
      )
      expect(toast).toHaveBeenCalledWith('OK: Game created', {
        type: 'success'
      })
      expect(defaultProps.onUpdate).toHaveBeenCalled()
    })
  })

  test('handles command error', async () => {
    const errorResponse = { type: 'error', text: 'Error occurred' }
    ;(postArenaCommand as jest.Mock).mockRejectedValueOnce(errorResponse)

    render(<ArenaStatusCard {...defaultProps} arenaGame={mockGame} />)

    fireEvent.click(screen.getByText('START ROUND'))

    await waitFor(() => {
      expect(postArenaCommand).toHaveBeenCalledWith(
        ARENA_SLACK_COMMANDS.START_ROUND
      )
      expect(toast).toHaveBeenCalledWith('Error : undefined', {
        type: 'error'
      })
    })
  })

  test('updates game state after ending game', async () => {
    const successResponse = { text: 'Game ended' }
    ;(postArenaCommand as jest.Mock).mockResolvedValueOnce(successResponse)

    render(<ArenaStatusCard {...defaultProps} arenaGame={mockGame} />)

    fireEvent.click(screen.getByText('END GAME'))

    await waitFor(() => {
      expect(defaultProps.onUpdate).toHaveBeenCalled()
    })
  })
})
