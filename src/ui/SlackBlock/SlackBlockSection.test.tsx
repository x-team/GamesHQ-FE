import React from 'react'
import { render, screen } from '@testing-library/react'
import SlackBlockSection, {
  type IProps as SlackBlockSectionProps
} from './SlackBlockSection'

describe('SlackBlockSection', () => {
  const defaultProps = {
    text: 'Section Title',
    onClose: jest.fn()
  }

  const mockAccessory: SlackBlockSectionProps['acessory'] = {
    action_id: 'test_action',
    type: 'multi_static_select',
    placeholder: {
      type: 'plain_text',
      text: 'Select options'
    },
    options: [
      { text: { text: 'Option 1', type: 'plain_text' }, value: '1' },
      { text: { text: 'Option 2', type: 'plain_text' }, value: '2' }
    ],
    initial_options: [
      { value: '1', text: { text: 'Option 1', type: 'plain_text' } }
    ]
  }

  test('renders section text with correct styling', () => {
    render(<SlackBlockSection {...defaultProps} />)

    const textElement = screen.getByText('Section Title')
    expect(textElement).toHaveClass(
      'text-xteamaccent',
      'font-bold',
      'font-sans',
      'text-lg',
      'italic',
      'uppercase'
    )
  })

  test('renders without multi-select when no accessory provided', () => {
    render(<SlackBlockSection {...defaultProps} />)

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  test('renders with multi-select when accessory provided', () => {
    render(<SlackBlockSection {...defaultProps} acessory={mockAccessory} />)

    expect(screen.getByText('Section Title')).toBeInTheDocument()
    expect(
      screen.getAllByTestId('slackBlockMultiStatic-select')[0]
    ).toBeInTheDocument()
  })
})
