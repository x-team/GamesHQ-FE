import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LeaderboardRanksPage from '../LeaderboardRanksPage'
import { getLeaderboardResults } from '../../api/leaderboards'

// Mock the API call
jest.mock('../../api/leaderboards')

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

const setup = (mockData = mockLeaderboardResults) => {
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
  it('renders the page title correctly', () => {
    setup()
    expect(screen.getByText('LEADERBOARD RESULTS')).toBeInTheDocument()
  })

  it('renders the table headers correctly', async () => {
    setup()
    await waitFor(() => {
      ;['id', 'score', 'User', 'Meta(JSON)'].forEach(header => {
        expect(screen.getByText(header)).toBeInTheDocument()
      })
    })
  })

  it('renders the leaderboard results correctly', async () => {
    setup()
    await waitFor(() => {
      mockLeaderboardResults.forEach(result => {
        expect(screen.getByText(result._user.email)).toBeInTheDocument()
        expect(screen.getByText(result.score.toString())).toBeInTheDocument()
      })
    })
  })

  it('calls getLeaderboardResults with correct parameters', async () => {
    setup()
    await waitFor(() => {
      expect(getLeaderboardResults).toHaveBeenCalledWith(
        Number(GAME_TYPE_ID),
        Number(LEADERBOARD_ID)
      )
    })
  })

  it('renders an empty table when no results are available', async () => {
    setup([])
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.queryByText('user1@example.com')).not.toBeInTheDocument()
    })
  })

  it('renders the Back button', () => {
    setup()
    expect(screen.getByText('Back')).toBeInTheDocument()
  })
})
