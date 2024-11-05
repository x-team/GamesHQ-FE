import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import Swal from 'sweetalert2'
import ListEnemiesPage from './ListEnemiesPage'
import { getEnemies, deleteEnemy } from '../api/admin'

jest.mock('../api/admin')
jest.mock('../helpers/emojiHelper')
jest.mock('sweetalert2')

const mockEnemies = [
  {
    id: 1,
    name: 'Enemy 1',
    emoji: '👾',
    isBoss: false,
    health: 100,
    minorDamageRate: 10,
    majorDamageRate: 20,
    _enemyPatternId: 'pattern1'
  },
  {
    id: 2,
    name: 'Enemy 2',
    emoji: '👹',
    isBoss: true,
    health: 200,
    minorDamageRate: 20,
    majorDamageRate: 30,
    _enemyPatternId: 'pattern2'
  }
]

describe('ListEnemiesPage', () => {
  beforeEach(() => {
    ;(getEnemies as jest.Mock).mockResolvedValue(mockEnemies)
  })

  test('renders the component and fetches enemies', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ListEnemiesPage />
        </MemoryRouter>
      )
    })

    expect(screen.getByText('ENEMIES')).toBeInTheDocument()
    expect(screen.getByText('New Enemy')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Enemy 1')).toBeInTheDocument()
      expect(screen.getByText('Enemy 2')).toBeInTheDocument()
      expect(screen.getByText('(Boss)')).toBeInTheDocument()
    })
  })

  test('displays loading state', async () => {
    ;(getEnemies as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockEnemies), 100))
    )

    render(
      <MemoryRouter>
        <ListEnemiesPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })

  test('deletes an enemy when confirmed', async () => {
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true })
    ;(deleteEnemy as jest.Mock).mockResolvedValue({})

    await act(async () => {
      render(
        <MemoryRouter>
          <ListEnemiesPage />
        </MemoryRouter>
      )
    })

    const deleteButtons = await screen.findAllByText('Delete')
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Delete it?',
          icon: 'warning',
          showCancelButton: true
        })
      )
      expect(deleteEnemy).toHaveBeenCalledWith(1)
      expect(getEnemies).toHaveBeenCalledTimes(2) // Initial load + after delete
    })
  })

  test('does not delete an enemy when cancelled', async () => {
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: false })

    await act(async () => {
      render(
        <MemoryRouter>
          <ListEnemiesPage />
        </MemoryRouter>
      )
    })

    const deleteButtons = await screen.findAllByText('Delete')
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled()
      expect(deleteEnemy).not.toHaveBeenCalled()
      expect(getEnemies).toHaveBeenCalledTimes(1) // Only initial load
    })
  })

  test('renders enemy details correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ListEnemiesPage />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(screen.getByText('Enemy 1')).toBeInTheDocument()
      expect(screen.getByText('pattern1')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('10 ~ 20')).toBeInTheDocument()

      expect(screen.getByText('Enemy 2')).toBeInTheDocument()
      expect(screen.getByText('(Boss)')).toBeInTheDocument()
      expect(screen.getByText('pattern2')).toBeInTheDocument()
      expect(screen.getByText('200')).toBeInTheDocument()
      expect(screen.getByText('20 ~ 30')).toBeInTheDocument()
    })
  })
})
