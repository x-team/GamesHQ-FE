import React from 'react'
import { render } from '@testing-library/react'
import SlackBlockPlainText from './SlackBlockPlainText'

describe('SlackBlockPlainText', () => {
  test('renders horizontal rule with correct classes', () => {
    const { container } = render(<SlackBlockPlainText />)
    const hr = container.querySelector('hr')

    expect(hr).toBeInTheDocument()
    expect(hr).toHaveClass('my-4')
  })
})
