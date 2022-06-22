import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/leaderboards";

const LeaderboardsPage =() => {
    const leaderboard = useState<ILeaderboard | undefined>();
    useEffect(() => {
        async function fetchLeaderboard() {
            const leaderboard = await getLeaderboard(1,2); // TODO GET FROM PARAM
        }

        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                ACHIEVEMENTS
            </h2>

            {leaderboard ? (
                <>
                    <table>
                        <tr></tr>
                    </table>
                </>
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
};

export default LeaderboardsPage;
