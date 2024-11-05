import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from './Dropdown'
import type { IProps as DropdownProps } from './Dropdown'

describe('TextInput', () => {
  const defaultProps: DropdownProps = {
    fieldProps: {
      name: 'test-select',
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn()
    },
    label: 'Test Label'
  }

  test('renders select with label', () => {
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Dropdown>
    )

    const select = screen.getByRole('combobox')
    const label = screen.getByText('Test Label')

    expect(select).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'test-select')
  })

  test('renders children options correctly', () => {
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Dropdown>
    )

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  test('applies full width class when specified', () => {
    render(
      <Dropdown {...defaultProps} fullWidth>
        <option value="1">Option 1</option>
      </Dropdown>
    )

    expect(screen.getByRole('combobox')).toHaveClass('w-full')
  })

  test('handles selection changes', async () => {
    const onChange = jest.fn()
    render(
      <Dropdown
        {...defaultProps}
        fieldProps={{ ...defaultProps.fieldProps, onChange }}
      >
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Dropdown>
    )

    await userEvent.selectOptions(screen.getByRole('combobox'), '2')
    expect(onChange).toHaveBeenCalled()
  })

  test('applies correct base styles', () => {
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
      </Dropdown>
    )

    const select = screen.getByRole('combobox')
    expect(select).toHaveClass(
      'block',
      'shadow',
      'border',
      'rounded',
      'py-2',
      'px-3'
    )
  })

  test('spreads fieldProps correctly', () => {
    const customFieldProps = {
      ...defaultProps.fieldProps,
      'data-testid': 'custom-select'
    }

    render(
      <Dropdown {...defaultProps} fieldProps={customFieldProps}>
        <option value="1">Option 1</option>
      </Dropdown>
    )

    expect(screen.getByTestId('custom-select')).toBeInTheDocument()
  })
})
