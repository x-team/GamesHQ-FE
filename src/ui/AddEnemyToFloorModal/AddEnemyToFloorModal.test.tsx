import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import AddEnemyToFloorModal, {
  type IProps as AddEnemyToFloorModalProps
} from './AddEnemyToFloorModal'
import { updateFloor } from '../../api/admin'

jest.mock('react-toastify')
jest.mock('../../api/admin')

const mockAllEmoji = {
  emoji1: 'url1',
  emoji2: 'url2'
}

const mockEnemies: AddEnemyToFloorModalProps['allEnemies'] = [
  {
    id: 1,
    name: 'Enemy1',
    emoji: 'emoji1',
    _enemyPatternId: '1',
    gifUrl: '',
    health: 12,
    isBoss: false,
    majorDamageRate: 21,
    minorDamageRate: 11
  },
  {
    id: 2,
    name: 'Enemy2',
    emoji: 'emoji2',
    _enemyPatternId: '1',
    gifUrl: '',
    health: 12,
    isBoss: false,
    majorDamageRate: 21,
    minorDamageRate: 11
  }
]

const mockFloor: AddEnemyToFloorModalProps['floor'] = {
  number: 1,
  _floorEnemies: [
    {
      _enemy: {
        id: 1,
        name: 'Enemy1',
        emoji: 'emoji1',
        gifUrl: '',
        health: 12,
        isBoss: false,
        majorDamageRate: 3,
        minorDamageRate: 7,
        _enemyPatternId: '123'
      },
      _enemyId: 1,
      _towerFloorid: 2,
      id: 1
    }
  ],
  _towerGameId: 1,
  isEveryoneVisible: true
}

const defaultProps: AddEnemyToFloorModalProps = {
  show: true,
  onClose: jest.fn(),
  floor: mockFloor,
  allEnemies: mockEnemies,
  allEmoji: mockAllEmoji
}

describe('AddEnemyToFloorModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders modal with correct title', () => {
    render(<AddEnemyToFloorModal {...defaultProps} />)
    expect(
      screen.getByText(`Edit Enemies on Floor ${mockFloor.number}`)
    ).toBeInTheDocument()
  })

  test('displays all enemies section', () => {
    render(<AddEnemyToFloorModal {...defaultProps} />)
    expect(screen.getByText('All enemies')).toBeInTheDocument()
  })

  test('displays floor enemies section', () => {
    render(<AddEnemyToFloorModal {...defaultProps} />)
    expect(screen.getByText('Floor Enemies')).toBeInTheDocument()
  })

  test('loads initial floor enemies on mount', () => {
    render(<AddEnemyToFloorModal {...defaultProps} />)
    // Verify initial enemy is displayed in floor enemies section
    expect(screen.getByText('1')).toBeInTheDocument() // Count badge for the initial enemy
  })

  test('adds enemy when clicking on enemy in all enemies section', () => {
    render(<AddEnemyToFloorModal {...defaultProps} />)
    const enemyElement = screen.getAllByRole('img')[1] // Second enemy in all enemies section
    fireEvent.click(enemyElement)
    expect(screen.getAllByRole('img')).toHaveLength(4) // Initial + newly added enemy
  })

  test('removes enemy when clicking on enemy in floor enemies section', () => {
    render(<AddEnemyToFloorModal {...defaultProps} />)
    const floorEnemyElement = screen.getAllByRole('img')[0]
    fireEvent.click(floorEnemyElement)
    // We expect 3 images: 2 from allEnemies section + 0 from floor enemies section
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  test('saves floor enemies successfully', async () => {
    ;(updateFloor as jest.Mock).mockResolvedValueOnce({})

    render(<AddEnemyToFloorModal {...defaultProps} />)

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(updateFloor).toHaveBeenCalledWith(1, { enemyIds: [1] })
      expect(toast).toHaveBeenCalledWith('Floor edited successfully.', {
        type: 'success'
      })
      expect(defaultProps.onClose).toHaveBeenCalledWith(true)
    })
  })

  test('handles save error correctly', async () => {
    const error = new Error('API Error')
    ;(updateFloor as jest.Mock).mockRejectedValueOnce(error)

    render(<AddEnemyToFloorModal {...defaultProps} />)

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        `Error adding enemies to floor. API Error `,
        { type: 'error' }
      )
    })
  })

  test('clears all floor enemies when clicking delete icon', () => {
    render(<AddEnemyToFloorModal {...defaultProps} />)
    const deleteIcon = screen.getByTestId('delete-icon')
    fireEvent.click(deleteIcon)

    expect(
      screen.queryByRole('img', { name: /floor enemy/i })
    ).not.toBeInTheDocument()
  })
})
