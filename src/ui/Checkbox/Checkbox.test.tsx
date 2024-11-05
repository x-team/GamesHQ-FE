import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  const defaultProps = {
    name: 'test-checkbox',
    value: '',
    onChange: jest.fn()
  }

  test('renders checkbox with label', () => {
    render(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(screen.getByText('Checkbox Label')).toBeInTheDocument()
  })

  test('handles boolean value correctly', () => {
    render(
      <Checkbox {...defaultProps} value="true">
        Checkbox Label
      </Checkbox>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  test('handles array value correctly', () => {
    const props = {
      ...defaultProps,
      id: '1',
      value: ['1', '2', '3']
    }

    render(<Checkbox {...props}>Checkbox Label</Checkbox>)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  test('handles array value with non-matching id', () => {
    const props = {
      ...defaultProps,
      id: '4',
      value: ['1', '2', '3']
    }

    render(<Checkbox {...props}>Checkbox Label</Checkbox>)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  test('triggers onChange when clicked', () => {
    const onChange = jest.fn()
    render(
      <Checkbox {...defaultProps} onChange={onChange}>
        Checkbox Label
      </Checkbox>
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalled()
  })

  test('applies correct styling classes', () => {
    render(<Checkbox {...defaultProps}>Checkbox Label</Checkbox>)

    const checkbox = screen.getByRole('checkbox')
    const container = checkbox.parentElement

    expect(checkbox).toHaveClass('h-5', 'w-5', 'mr-2', 'text-blue-500')
    expect(container).toHaveClass(
      'flex',
      'items-center',
      'text-gray-700',
      'my-2'
    )
  })
})
