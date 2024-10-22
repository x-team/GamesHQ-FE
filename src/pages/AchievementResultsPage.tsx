import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAchievementsProgress } from '../api/achievements'
import Button from '../ui/Button'

const AchievementResultsPage = () => {
  const [achievementResults, setAchievementResults] = useState<
    IAchievementUnlocked[] | undefined
  >()
  const navigate = useNavigate()
  const { gameTypeId, achievementId } = useParams<{
    gameTypeId: string
    achievementId: string
  }>()

  useEffect(() => {
    async function fetchAchievementProgress() {
      if (!gameTypeId || !achievementId) {
        return
      }

      const achievementsRes = await getAchievementsProgress(
        Number(gameTypeId),
        Number(achievementId)
      )

      setAchievementResults(achievementsRes)
      return achievementsRes
    }

    fetchAchievementProgress()
  }, [gameTypeId, achievementId])

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">
        ACHIEVEMENT RANK
      </h2>

      <table className="shadow-lg bg-white border-collapse w-full mb-8">
        <thead>
          <tr>
            <th className="bg-gray-100 border text-left px-8 py-4">User</th>
            <th className="bg-gray-100 border text-left px-8 py-4">Rank</th>
          </tr>
        </thead>
        <tbody>
          {achievementResults &&
            achievementResults?.map(
              (achievementRank: IAchievementUnlocked, index) => (
                // Despite it's not a good practice using index as a key, it's the only way
                // to certify key is unique for every row, since AchievementUnlocked table won't have an id.
                <tr key={index}>
                  <td className="border px-8 py-4">
                    {achievementRank._user?.email}
                  </td>
                  <td className="border px-8 py-4">
                    {achievementRank?.progress}
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
      <Button onClick={() => navigate(`/games/${gameTypeId}`)}>Back</Button>
    </div>
  )
}

export default AchievementResultsPage
