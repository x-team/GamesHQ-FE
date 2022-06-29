import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getLeaderboardResults,
} from "../api/leaderboards";
import Button from "../ui/Button";

const LeaderboardsPage = () => {
  const [leaderboardResults, setLeaderboardResults] = useState<ILeaderboardResult[] | undefined>();
  const { gameTypeId, leaderboardId } = useParams<{
    gameTypeId: string;
    leaderboardId: string;
  }>();

  useEffect(() => {
    async function fetchLeaderboardResults() {
      if (!gameTypeId || !leaderboardId) {
        return;
      }
      const leaderboardsRes = await getLeaderboardResults(
        Number(gameTypeId),
        Number(leaderboardId)
      ); // TODO GET FROM PARAM

      setLeaderboardResults(leaderboardsRes);
      return leaderboardsRes;
    }

    fetchLeaderboardResults();
  }, [gameTypeId, leaderboardId]);

  return (
    <div>
      <h2 className="text-2xl font-bold italic font-sans mb-8">LEADERBOARD RESULTS</h2>

      <table className="shadow-lg bg-white border-collapse w-full">
        <thead>
          <tr>
            <th className="bg-gray-100 border text-left px-8 py-4">id</th>
            <th className="bg-gray-100 border text-left px-8 py-4">score</th>
            <th className="bg-gray-100 border text-left px-8 py-4">
              User ID
            </th>
            <th className="bg-gray-100 border text-left px-8 py-4">Edit</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardResults &&
            leaderboardResults?.map((ldr: ILeaderboardResult) => (
              <tr key={ldr.id}>
                <td className="border px-8 py-4">{ldr.id}</td>
                <td className="border px-8 py-4">{ldr.score}</td>
                <td className="border px-8 py-4">
                  {ldr._userId}
                </td>
                <td className="border px-8 py-4">
                  <Button
                    onClick={() => {
                      console.log("SHOW EDIT LEADERBOARD MODAL");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardsPage;
