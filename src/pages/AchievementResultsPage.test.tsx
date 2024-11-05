import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AchievementResultsPage from './AchievementResultsPage'
import { getAchievementsProgress } from '../api/achievements'

// Mock the api function
jest.mock('../api/achievements')

// Mock the Button component
jest.mock('../ui/Button', () => {
  const Button = ({
    children,
    onClick
  }: {
    children: React.ReactNode
    onClick: () => void
  }) => <button onClick={onClick}>{children}</button>
  return Button
})

const renderComponent = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route
          path="/games/:gameTypeId/achievements/:achievementId"
          element={<AchievementResultsPage />}
        />
      </Routes>
    </MemoryRouter>
  )

const mockAchievementResults = [
  { _user: { email: 'user1@example.com' }, progress: 100 },
  { _user: { email: 'user2@example.com' }, progress: 75 }
]

describe('AchievementResultsPage', () => {
  beforeEach(() => {
    ;(getAchievementsProgress as jest.Mock).mockResolvedValue(
      mockAchievementResults
    )
  })

  test('renders the achievement rank title', async () => {
    await renderComponent('/games/1/achievements/2')
    expect(screen.getByText('ACHIEVEMENT RANK')).toBeInTheDocument()
  })

  test('fetches and displays achievement results', async () => {
    await renderComponent('/games/1/achievements/2')

    await waitFor(() => {
      expect(getAchievementsProgress).toHaveBeenCalledWith(1, 2)
      expect(screen.getByText('user1@example.com')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('user2@example.com')).toBeInTheDocument()
      expect(screen.getByText('75')).toBeInTheDocument()
    })
  })

  test('renders the back button', async () => {
    renderComponent('/games/1/achievements/2')

    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  test('does not fetch achievements when gameTypeId or achievementId is missing', async () => {
    await renderComponent('/games//achievements/')

    expect(getAchievementsProgress).not.toHaveBeenCalled()
  })
})
