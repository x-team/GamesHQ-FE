import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import SlackBlockStaticSelect, {
  type IProps as SlackBlockStaticSelectProps
} from './SlackBlockStaticSelect'
import { postArenaAction } from '../../api/admin'

jest.mock('react-toastify')
jest.mock('../../api/admin')

describe('SlackBlockStaticSelect', () => {
  const mockStaticSelectElement: SlackBlockStaticSelectProps['staticSelectElement'] =
    {
      type: 'static_select',
      action_id: 'test_action',
      placeholder: {
        text: 'Select an option',
        type: 'plain_text'
      },
      options: [
        { text: { text: 'Option 1 :emoji:', type: 'mrkdwn' }, value: '1' },
        { text: { text: 'Option 2', type: 'plain_text' }, value: '2' }
      ],
      initial_option: {
        value: '1',
        text: { text: 'Option 1', type: 'plain_text' }
      }
    }

  const defaultProps: SlackBlockStaticSelectProps = {
    staticSelectElement: mockStaticSelectElement,
    onClose: jest.fn()
  }

  test('renders dropdown with options', () => {
    render(<SlackBlockStaticSelect {...defaultProps} />)

    const dropdown = screen.getByRole('combobox')
    const options = screen.getAllByRole('option')

    expect(screen.getByText('Select an option')).toBeInTheDocument()
    expect(dropdown).toBeInTheDocument()
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveAttribute('value', '1')
    expect(options[1]).toHaveAttribute('value', '2')
  })

  test('handles successful form submission', async () => {
    const successResponse = {
      type: 'response',
      blocks: []
    }

    ;(postArenaAction as jest.Mock).mockResolvedValueOnce(successResponse)

    render(<SlackBlockStaticSelect {...defaultProps} />)

    fireEvent.click(screen.getByText('Send Action'))

    await waitFor(() => {
      expect(postArenaAction).toHaveBeenCalledWith('test_action', ['1'])
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

    render(<SlackBlockStaticSelect {...defaultProps} />)

    fireEvent.click(screen.getByText('Send Action'))

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Error : undefined', {
        type: 'error'
      })
      expect(defaultProps.onClose).toHaveBeenCalled()
    })
  })

  test('sets initial value from staticSelectElement', () => {
    render(<SlackBlockStaticSelect {...defaultProps} />)

    const dropdown = screen.getByRole('combobox')
    expect(dropdown).toHaveValue('1')
  })

  test('updates form value when selection changes', () => {
    render(<SlackBlockStaticSelect {...defaultProps} />)

    const dropdown = screen.getByRole('combobox')
    fireEvent.change(dropdown, { target: { value: '2' } })

    expect(dropdown).toHaveValue('2')
  })
})
