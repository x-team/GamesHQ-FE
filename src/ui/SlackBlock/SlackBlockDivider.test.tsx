import React from 'react'
import { render } from '@testing-library/react'
import SlackBlockDivider from './SlackBlockDivider'

describe('SlackBlockDivider', () => {
  test('renders horizontal rule with correct classes', () => {
    const { container } = render(<SlackBlockDivider />)
    const hr = container.querySelector('hr')

    expect(hr).toBeInTheDocument()
    expect(hr).toHaveClass('my-4')
  })
})
