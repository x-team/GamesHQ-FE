import React from 'react'

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import SlackBlockMultiStaticSelect, {
  type IProps as SlackBlockMultiStaticSelectProps
} from './SlackBlockMultiStaticSelect'
import { postArenaAction } from '../../api/admin'

jest.mock('react-toastify')
jest.mock('../../api/admin')

describe('SlackBlockMultiStaticSelect', () => {
  const defaultProps: SlackBlockMultiStaticSelectProps = {
    multiStaticSelectElement: {
      type: 'multi_static_select',
      placeholder: { text: 'Placeholder', type: 'plain_text' },
      initial_options: [
        {
          text: {
            type: 'plain_text',
            text: 'string'
          },
          value: 'string'
        }
      ],
      action_id: 'test_action',
      options: [
        { text: { text: 'Option 1 :emoji:', type: 'mrkdwn' }, value: '1' },
        { text: { text: 'Option 2', type: 'plain_text' }, value: '2' }
      ]
    },
    onClose: jest.fn()
  }

  test('renders checkboxes for all options', () => {
    render(<SlackBlockMultiStaticSelect {...defaultProps} />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(2)
  })

  test('handles successful form submission', async () => {
    const successResponse = {
      type: 'response',
      blocks: []
    }
    ;(postArenaAction as jest.Mock).mockResolvedValueOnce(successResponse)

    render(<SlackBlockMultiStaticSelect {...defaultProps} />)

    fireEvent.click(screen.getByText('Send Action'))

    await waitFor(() => {
      expect(postArenaAction).toHaveBeenCalledWith('test_action', ['1', '2'])
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

    render(<SlackBlockMultiStaticSelect {...defaultProps} />)

    fireEvent.click(screen.getByText('Send Action'))

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Error : undefined', {
        type: 'error'
      })
      expect(defaultProps.onClose).toHaveBeenCalled()
    })
  })

  test('initializes with all options selected', () => {
    render(<SlackBlockMultiStaticSelect {...defaultProps} />)

    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked()
    })
  })

  test('renders with correct test id', () => {
    render(<SlackBlockMultiStaticSelect {...defaultProps} />)
    expect(
      screen.getByTestId('slackBlockMultiStatic-select')
    ).toBeInTheDocument()
  })
})
