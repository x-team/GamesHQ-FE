import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ListZonesPage from './ListZonesPage'
import { getZones, deleteZone } from '../api/admin'
import Swal from 'sweetalert2'

// Mock the modules
jest.mock('../api/admin')
jest.mock('sweetalert2')
jest.mock('react-spinners', () => ({
  SyncLoader: () => <div data-testid="sync-loader">Loading...</div>
}))

// Mock the IZone interface
interface IZone {
  id: string
  name: string
  ring: string
  isArchived: boolean
}

const mockZones: IZone[] = [
  { id: '1', name: 'Zone 1', ring: 'A1', isArchived: false },
  { id: '2', name: 'Zone 2', ring: 'B2', isArchived: true }
]

describe('ListZonesPage', () => {
  beforeEach(() => {
    ;(getZones as jest.Mock).mockResolvedValue(mockZones)
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true })
  })

  it('renders the component and fetches zones', async () => {
    render(
      <BrowserRouter>
        <ListZonesPage />
      </BrowserRouter>
    )

    expect(screen.getByText('ZONES')).toBeInTheDocument()
    expect(screen.getByText('New Zone')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Zone 1')).toBeInTheDocument()
      expect(screen.getByText('Zone 2')).toBeInTheDocument()
    })
  })

  it('displays loading spinner while fetching zones', async () => {
    render(
      <BrowserRouter>
        <ListZonesPage />
      </BrowserRouter>
    )

    expect(screen.getByTestId('sync-loader')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId('sync-loader')).not.toBeInTheDocument()
    })
  })

  it('displays archived status for archived zones', async () => {
    render(
      <BrowserRouter>
        <ListZonesPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Archived')).toBeInTheDocument()
    })
  })

  it('deletes a zone when delete button is clicked and confirmed', async () => {
    ;(deleteZone as jest.Mock).mockResolvedValue(undefined)

    render(
      <BrowserRouter>
        <ListZonesPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getAllByText('Delete')[0]).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(screen.getAllByText('Delete')[0])
    })

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Delete zone Zone 1 (A1)?'
      })
    )

    await waitFor(() => {
      expect(deleteZone).toHaveBeenCalledWith('1')
      expect(getZones).toHaveBeenCalledTimes(2) // Initial load + after delete
    })
  })

  it('does not delete a zone when delete is canceled', async () => {
    ;(Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: false })

    render(
      <BrowserRouter>
        <ListZonesPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getAllByText('Delete')[0]).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(screen.getAllByText('Delete')[0])
    })

    expect(Swal.fire).toHaveBeenCalled()

    await waitFor(() => {
      expect(deleteZone).not.toHaveBeenCalled()
      expect(getZones).toHaveBeenCalledTimes(1) // Only initial load
    })
  })
})
