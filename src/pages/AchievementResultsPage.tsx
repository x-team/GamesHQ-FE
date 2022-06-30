import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAchievementsProgress } from "../api/achievements";
import Button from "../ui/Button";


const AchievementResultsPage = () => {
  const [achievementResults, setAchievementResults] = useState<IAchievementRank[] | undefined>();
  const { gameTypeId, achievementId } = useParams<{
    gameTypeId: string;
    achievementId: string;
  }>();

  useEffect(() => {
    async function fetchAchievementProgress() {
      if (!gameTypeId || !achievementId) {
        return;
      }

      const achievementsRes = await getAchievementsProgress(
        Number(gameTypeId),
        Number(achievementId)
      );
      
      setAchievementResults(achievementsRes);
      return achievementsRes;
    }

    fetchAchievementProgress();
  }, [gameTypeId, achievementId]);

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">ACHIEVEMENT RANK</h2>

      <table className="shadow-lg bg-white border-collapse w-full">
        <thead>
          <tr>
            <th className="bg-gray-100 border text-left px-8 py-4">Id</th>
            <th className="bg-gray-100 border text-left px-8 py-4">Description</th>
            <th className="bg-gray-100 border text-left px-8 py-4">
              Rank
            </th>
          </tr>
        </thead>
        <tbody>
          {achievementResults &&
            achievementResults?.map((achievementRank: IAchievementRank) => (
              <tr key={achievementRank.id}>
                <td className="border px-8 py-4">{achievementRank.id}</td>
                <td className="border px-8 py-4">{achievementRank.description}</td>
                <td className="border px-8 py-4">
                  {achievementRank?.rank}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AchievementResultsPage;
