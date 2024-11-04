import React from 'react'
import { render, screen } from '@testing-library/react'
import PanelBox from './PanelBox'

describe('PanelBox', () => {
  test('renders children correctly', () => {
    render(
      <PanelBox>
        <div>Test Content</div>
      </PanelBox>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('applies default classes', () => {
    render(
      <PanelBox>
        <div>Content</div>
      </PanelBox>
    )

    const panel = screen.getByText('Content').parentElement
    expect(panel).toHaveClass(
      'p-6',
      'bg-white',
      'rounded-xl',
      'border',
      'border-gray-200',
      'flex',
      'flex-col'
    )
  })

  test('merges additional className prop', () => {
    render(
      <PanelBox className="mt-4 custom-class">
        <div>Content</div>
      </PanelBox>
    )

    const panel = screen.getByText('Content').parentElement
    expect(panel).toHaveClass('mt-4', 'custom-class')
    expect(panel).toHaveClass('p-6', 'bg-white', 'rounded-xl')
  })
})
