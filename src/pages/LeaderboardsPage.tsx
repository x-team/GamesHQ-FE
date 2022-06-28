import { useEffect, useState } from "react";
import { getGameTypeLeaderboards } from "../api/leaderboards";
import Button from "../ui/Button";

const LeaderboardsPage =() => {
    const [leaderboards, setLeaderboards] = useState<ILeaderboard[] | undefined>();
    useEffect(() => {
        async function fetchLeaderboard() {
            const leaderboardsRes =  await getGameTypeLeaderboards(4); // TODO GET FROM PARAM
            setLeaderboards(leaderboardsRes);
            return leaderboardsRes;
        }

        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                LEADERBOARDS
            </h2>

                <table className="shadow-lg bg-white border-collapse w-full">
                    <tr>
                    <th className="bg-gray-100 border text-left px-8 py-4">id</th>
                    <th className="bg-gray-100 border text-left px-8 py-4">name</th>
                    <th className="bg-gray-100 border text-left px-8 py-4">
                        scoreStrategy
                    </th>
                    <th className="bg-gray-100 border text-left px-8 py-4">
                        resetStrategy
                    </th>
                    <th className="bg-gray-100 border text-left px-8 py-4">Edit</th>
                    </tr>
                    {leaderboards && leaderboards?.map(
                    (leaderboard: ILeaderboard) => (
                        <tr>
                        <td className="border px-8 py-4" >{leaderboard.id}</td>
                        <td className="border px-8 py-4">{leaderboard.name}</td>
                        <td className="border px-8 py-4">
                            {leaderboard.scoreStrategy}
                        </td>
                        <td className="border px-8 py-4">
                            {leaderboard.resetStrategy}
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
                </table>
        </div>
    );
};

export default LeaderboardsPage;
