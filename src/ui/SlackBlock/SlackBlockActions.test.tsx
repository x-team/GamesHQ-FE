import React from 'react'
import { render, screen } from '@testing-library/react'
import SlackBlockActions from './SlackBlockActions'
import type {
  SlackBlockKitButtonElement,
  SlackBlockKitSelectMenuElement
} from '../../SlackBlockKit'

describe('SlackBlockActions', () => {
  const onClose = jest.fn()

  const mockSelectElement = {
    type: 'static_select' as const,
    action_id: 'select1',
    placeholder: { text: 'Select option' },
    options: [{ text: 'Option 1', value: '1' }]
  }

  const mockButtonElement = {
    type: 'button' as const,
    action_id: 'button1',
    text: { text: 'Click me' }
  }

  test('renders static select elements', () => {
    render(
      <SlackBlockActions
        elements={
          [mockSelectElement] as unknown as (
            | SlackBlockKitSelectMenuElement
            | SlackBlockKitButtonElement
          )[]
        }
        onClose={onClose}
      />
    )
    expect(screen.getByText('Select option')).toBeInTheDocument()
  })

  test('renders button elements', () => {
    render(
      <SlackBlockActions
        elements={
          [mockButtonElement] as unknown as (
            | SlackBlockKitSelectMenuElement
            | SlackBlockKitButtonElement
          )[]
        }
        onClose={onClose}
      />
    )
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('renders mixed elements in order', () => {
    render(
      <SlackBlockActions
        elements={
          [mockSelectElement, mockButtonElement] as unknown as (
            | SlackBlockKitSelectMenuElement
            | SlackBlockKitButtonElement
          )[]
        }
        onClose={onClose}
      />
    )

    expect(screen.getByText('Select option')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
