import { useEffect, useState } from "react";
import { getAchievement } from "../api/achievements";

const AchievementsPage =() => {
    const achievement = useState<IAchievement | undefined>();
    useEffect(() => {
        async function fetchAchievement() {
            const achievement = await getAchievement(1,2); // TODO GET FROM PARAM
        }

        fetchAchievement();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                ACHIEVEMENTS
            </h2>

            {achievement ? (
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

export default AchievementsPage;
