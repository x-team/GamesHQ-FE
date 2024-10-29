import React, { render, screen, fireEvent } from '@testing-library/react'
import Modal from '../Modal'

describe('Modal', () => {
  const defaultProps = {
    show: true,
    onClose: jest.fn()
  }

  test('renders modal content when `show` is true', () => {
    render(
      <Modal {...defaultProps}>
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.getByText('Modal Content')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('min-w-screen', 'h-screen')
  })

  test('does not render when `show` is false', () => {
    render(
      <Modal {...defaultProps} show={false}>
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  test('calls onClose when clicking overlay', () => {
    const onClose = jest.fn()
    render(
      <Modal {...defaultProps} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    )

    const overlay = screen.getByRole('button').children[0]
    fireEvent.click(overlay)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('renders with correct styles', () => {
    render(
      <Modal {...defaultProps}>
        <div>Modal Content</div>
      </Modal>
    )

    const modalContainer = screen.getByRole('button')
    const contentContainer = modalContainer.children[1]

    expect(modalContainer).toHaveClass(
      'fixed',
      'flex',
      'justify-center',
      'items-center'
    )
    expect(contentContainer).toHaveClass('bg-white', 'rounded-xl', 'shadow-lg')
  })

  test('modal content does not trigger onClose', () => {
    const onClose = jest.fn()
    render(
      <Modal {...defaultProps} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    )

    const contentContainer = screen.getByRole('button').children[1]
    fireEvent.click(contentContainer)

    expect(onClose).not.toHaveBeenCalled()
  })
})
