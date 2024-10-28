import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LeaderboardRanksPage from './LeaderboardRanksPage'
import { getLeaderboardResults } from '../api/leaderboards'

// Mock the API call
jest.mock('../api/leaderboards')

const GAME_TYPE_ID = '1'
const LEADERBOARD_ID = '2'
const ROUTE = `/games/${GAME_TYPE_ID}/leaderboards/${LEADERBOARD_ID}`

const mockLeaderboardResults = [
  {
    id: 1,
    score: 100,
    _user: { email: 'user1@example.com' },
    _leaderboardResultsMeta: [{ key: 'value1' }]
  },
  {
    id: 2,
    score: 90,
    _user: { email: 'user2@example.com' },
    _leaderboardResultsMeta: [{ key: 'value2' }]
  }
]

const renderComponent = (mockData = mockLeaderboardResults) => {
  ;(getLeaderboardResults as jest.Mock).mockResolvedValue(mockData)
  return render(
    <MemoryRouter initialEntries={[ROUTE]}>
      <Routes>
        <Route
          path="/games/:gameTypeId/leaderboards/:leaderboardId"
          element={<LeaderboardRanksPage />}
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('LeaderboardRanksPage', () => {
  test('renders the page title correctly', () => {
    renderComponent()
    expect(screen.getByText('LEADERBOARD RESULTS')).toBeInTheDocument()
  })

  test('renders the table headers correctly', async () => {
    renderComponent()
    await waitFor(() => {
      ;['id', 'score', 'User', 'Meta(JSON)'].forEach(header => {
        expect(screen.getByText(header)).toBeInTheDocument()
      })
    })
  })

  test('renders the leaderboard results correctly', async () => {
    renderComponent()
    await waitFor(() => {
      mockLeaderboardResults.forEach(result => {
        expect(screen.getByText(result._user.email)).toBeInTheDocument()
        expect(screen.getByText(result.score.toString())).toBeInTheDocument()
      })
    })
  })

  test('calls getLeaderboardResults with correct parameters', async () => {
    renderComponent()
    await waitFor(() => {
      expect(getLeaderboardResults).toHaveBeenCalledWith(
        Number(GAME_TYPE_ID),
        Number(LEADERBOARD_ID)
      )
    })
  })

  test('renders an empty table when no results are available', async () => {
    renderComponent([])
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.queryByText('user1@example.com')).not.toBeInTheDocument()
    })
  })

  test('renders the Back button', () => {
    renderComponent()
    expect(screen.getByText('Back')).toBeInTheDocument()
  })
})
