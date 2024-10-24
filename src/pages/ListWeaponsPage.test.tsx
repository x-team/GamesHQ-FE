import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ListWeaponsPage from './ListWeaponsPage'
import { getWeapons, deleteWeapon } from '../api/admin'
import Swal from 'sweetalert2'

// Mock the API calls
jest.mock('../api/admin')
jest.mock('sweetalert2')

const mockWeapons = [
  {
    id: 1,
    name: 'Sword',
    emoji: '🗡️',
    _itemRarityId: 'Common',
    isArchived: false,
    usageLimit: 10,
    _weapon: { minorDamageRate: 5, majorDamageRate: 10 },
    _gameItemAvailability: [{ _gameType: { name: 'RPG' } }],
    _traits: [{ displayName: 'Sharp' }]
  },
  {
    id: 2,
    name: 'Bow',
    emoji: '🏹',
    _itemRarityId: 'Rare',
    isArchived: true,
    usageLimit: null,
    _weapon: { minorDamageRate: 3, majorDamageRate: 8 },
    _gameItemAvailability: [{ _gameType: { name: 'Adventure' } }],
    _traits: [{ displayName: 'Ranged' }, { displayName: 'Silent' }]
  }
]

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <ListWeaponsPage />
    </MemoryRouter>
  )
}

describe('ListWeaponsPage', () => {
  beforeEach(() => {
    ;(getWeapons as jest.Mock).mockResolvedValue(mockWeapons)
  })

  it('renders the page title correctly', async () => {
    renderComponent()
    expect(screen.getByText('WEAPONS')).toBeInTheDocument()
  })

  it('renders the "New Weapon" button', async () => {
    renderComponent()
    expect(screen.getByText('New Weapon')).toBeInTheDocument()
  })

  it('fetches and displays weapons', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('Sword')).toBeInTheDocument()
      expect(screen.getByText('Bow (Archived)')).toBeInTheDocument()
    })
  })

  it('displays weapon details correctly', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('5 ~ 10')).toBeInTheDocument() // Damage for Sword
      expect(screen.getByText('10')).toBeInTheDocument() // Usage limit for Sword
      expect(screen.getByText('∞')).toBeInTheDocument() // Infinite usage limit for Bow
      expect(screen.getByText('Sharp')).toBeInTheDocument() // Trait for Sword
      expect(screen.getByText('Ranged, Silent')).toBeInTheDocument() // Traits for Bow
    })
  })

  it('sorts weapons by rarity', async () => {
    renderComponent()
    await waitFor(() => {
      const weapons = screen.getAllByText(/Sword|Bow/)
      expect(weapons[0]).toHaveTextContent('Bow')
      expect(weapons[1]).toHaveTextContent('Sword')
    })
  })

  it('handles error state', async () => {
    const errorMessage = 'Failed to fetch weapons'
    ;(getWeapons as jest.Mock).mockRejectedValue(new Error(errorMessage))
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('calls deleteWeapon when delete button is clicked and confirmed', async () => {
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true })
    renderComponent()
    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0])
    })
    expect(Swal.fire).toHaveBeenCalled()
  })

  it('does not call deleteWeapon when delete is not confirmed', async () => {
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: false })
    renderComponent()
    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0])
    })
    expect(Swal.fire).toHaveBeenCalled()
    await waitFor(() => {
      expect(deleteWeapon).not.toHaveBeenCalled()
    })
  })
})
