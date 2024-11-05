import React from 'react'

import { render, screen } from '@testing-library/react'
import TextInput from './TextInput'

describe('TextInput', () => {
  const defaultProps = {
    name: 'test-input',
    label: 'Test Label'
  }

  test('renders label and input correctly', () => {
    render(<TextInput {...defaultProps} />)

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'test-input')
  })

  test('displays helper text when provided', () => {
    render(<TextInput {...defaultProps} helperText="Helper message" />)

    expect(screen.getByText('Helper message')).toBeInTheDocument()
  })

  test('shows error message when error exists and field is touched', () => {
    render(<TextInput {...defaultProps} error="Error message" touched={true} />)

    expect(screen.getByText('Error message')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
  })

  test('applies success styles when touched and no error', () => {
    render(<TextInput {...defaultProps} touched={true} />)

    expect(screen.getByRole('textbox')).toHaveClass('border-green-500')
  })

  test('applies default styles when not touched', () => {
    render(<TextInput {...defaultProps} />)

    expect(screen.getByRole('textbox')).toHaveClass('text-gray-700')
  })

  test('applies full width class when fullWidth prop is true', () => {
    render(<TextInput {...defaultProps} fullWidth />)

    expect(screen.getByRole('textbox')).toHaveClass('w-full')
  })

  test('renders different input types correctly', () => {
    const { container } = render(
      <TextInput {...defaultProps} type="password" />
    )

    const input = container.querySelector('input[type="password"]')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  test('applies extra classes when provided', () => {
    render(<TextInput {...defaultProps} extraClass="custom-class" />)

    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })
})
