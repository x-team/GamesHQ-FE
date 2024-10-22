import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLeaderboardResults } from '../api/leaderboards'
import Button from '../ui/Button'

const LeaderboardsPage = () => {
  const [leaderboardResults, setLeaderboardResults] = useState<
    ILeaderboardResult[] | undefined
  >()
  const navigate = useNavigate()
  const { gameTypeId, leaderboardId } = useParams<{
    gameTypeId: string
    leaderboardId: string
  }>()

  useEffect(() => {
    async function fetchLeaderboardResults() {
      if (!gameTypeId || !leaderboardId) {
        return
      }

      const leaderboardsRes = await getLeaderboardResults(
        Number(gameTypeId),
        Number(leaderboardId)
      )

      setLeaderboardResults(leaderboardsRes)
      return leaderboardsRes
    }

    fetchLeaderboardResults()
  }, [gameTypeId, leaderboardId])

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">
        LEADERBOARD RESULTS
      </h2>

      <table className="shadow-lg bg-white border-collapse w-full mb-8">
        <thead>
          <tr>
            <th className="bg-gray-100 border text-left px-8 py-4">id</th>
            <th className="bg-gray-100 border text-left px-8 py-4">score</th>
            <th className="bg-gray-100 border text-left px-8 py-4">User</th>
            <th className="bg-gray-100 border text-left px-8 py-4">
              Meta(JSON)
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboardResults &&
            leaderboardResults?.map((ldr: ILeaderboardResult) => (
              <tr key={ldr.id}>
                <td className="border px-8 py-4">{ldr.id}</td>
                <td className="border px-8 py-4">{ldr.score}</td>
                <td className="border px-8 py-4">{ldr._user?.email}</td>
                <td className="border px-8 py-4">
                  {ldr._leaderboardResultsMeta?.map(
                    (meta: ILeaderboardResultMeta) =>
                      JSON.stringify(meta) + ', '
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Button onClick={() => navigate(`/games/${gameTypeId}`)}>Back</Button>
    </div>
  )
}

export default LeaderboardsPage
