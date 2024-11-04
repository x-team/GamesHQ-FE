import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('applies enabled styles correctly', () => {
    render(<Button>Enabled Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('bg-xteamaccent', 'text-white')
    expect(button).not.toHaveClass('cursor-not-allowed')
  })

  test('applies disabled styles correctly', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass(
      'bg-gray-100',
      'text-gray-400',
      'cursor-not-allowed'
    )
    expect(button).not.toHaveClass('bg-xteamaccent')
  })

  test('applies full width class when specified', () => {
    render(<Button fullWidth>Full Width Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  test('sets correct button type', () => {
    render(<Button type="submit">Submit Button</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  test('has no type attribute when not specified', () => {
    render(<Button>Default Button</Button>)
    expect(screen.getByRole('button')).not.toHaveAttribute('type')
  })
})
