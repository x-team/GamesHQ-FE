import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import SlackBlockButton, {
  type IProps as SlackBlockButtonProps
} from './SlackBlockButton'
import { postArenaAction } from '../../api/admin'

jest.mock('react-toastify')
jest.mock('../../api/admin')

describe('SlackBlockButton', () => {
  const defaultProps: SlackBlockButtonProps = {
    buttonElement: {
      type: 'button',
      action_id: 'test_action',
      text: { text: 'Click Me', type: 'plain_text' }
    },
    onClose: jest.fn()
  }

  test('renders button with correct text', () => {
    render(<SlackBlockButton {...defaultProps} />)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  test('handles successful form submission', async () => {
    const successResponse = {
      type: 'response',
      blocks: []
    }
    ;(postArenaAction as jest.Mock).mockResolvedValueOnce(successResponse)

    render(<SlackBlockButton {...defaultProps} />)
    fireEvent.click(screen.getByText('Click Me'))

    await waitFor(() => {
      expect(postArenaAction).toHaveBeenCalledWith('test_action')
      expect(toast).toHaveBeenCalledWith('OK: ', {
        type: 'success'
      })
      expect(defaultProps.onClose).toHaveBeenCalled()
    })
  })

  test('handles submission error', async () => {
    const errorResponse = {
      type: 'error'
    }
    ;(postArenaAction as jest.Mock).mockRejectedValueOnce(errorResponse)

    render(<SlackBlockButton {...defaultProps} />)
    fireEvent.click(screen.getByText('Click Me'))

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Error : undefined', {
        type: 'error'
      })
    })
  })

  test('applies full width styling to button', () => {
    render(<SlackBlockButton {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('w-full')
  })
})
