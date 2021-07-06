import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
} from "recharts";
import { emojiToImageTag } from "../../helpers/emojiHelper";
import { truncateText } from "../../helpers/textHelper";

interface IProps {
    player: IArenaPlayer;
}

const InspectArenaPlayerCard = function InspectArenaPlayerCard({
    player,
}: IProps) {
    const archetypeData = [
        {
            subject: "A",
            A: 30,
            fullMark: 100,
        },
        {
            subject: "T",
            A: 30,
            fullMark: 100,
        },
        {
            subject: "V",
            A: 30,
            fullMark: 100,
        },
    ];

    return (
        <span className="mr-2 mb-2">
            <div
                className={`w-max bg-white rounded-lg border flex flex-col cursor-pointer ${
                    player.readyForRound
                        ? "border-xteamaccent"
                        : "border-gray-200"
                }`}
            >
                <div className="flex">
                    <div className="w-24 flex flex-col justify-center items-center">
                        <img
                            className="w-12 h-12 rounded-full mb-1 "
                            src={player.photoUrl}
                            alt={player.name}
                        />
                        <div className="font-semibold text-center">
                            {truncateText(player.name, 9)}
                        </div>
                        <div className="font-semibold text-lg text-center flex justify-center items-center">
                            {emojiToImageTag(":health-heart:", "w-4 h-4")}
                            <span className="text-base ml-1">
                                {player.health}
                            </span>
                            {emojiToImageTag(
                                ":arena-armor-epic:",
                                "h-5 w-5 ml-2"
                            )}
                        </div>

                        <span className="thin font-sans text-center flex items-center justify-center mt-1 gap-1">
                            <span className="flex items-center">
                                <span className="mr-1">4</span>
                                {emojiToImageTag(":medkit:", "h-5 w-5")}
                            </span>
                            <span className="flex items-center">
                                <span className="mr-1">112</span>
                                {emojiToImageTag(":cheer-star:", "h-5 w-5")}
                            </span>
                        </span>
                    </div>

                    <div className="w-32 bg-gray-100 rounded-br-lg rounded-tr-lg h-36">
                        <div className="relative h-full flex flex-col">
                            <div className="absolute mt-2">
                                <span className="text-gray-400 thin font-sans text-center flex justify-center items-center mb-2 opacity-5">
                                    {emojiToImageTag(
                                        player.team.emoji,
                                        "h-32 w-32"
                                    )}
                                </span>
                            </div>

                            <span className="text-gray-400 thin font-sans text-center flex ml-4">
                                <div className="mt-2 flex flex-wrap">
                                    {player.weapons.map((weapon) =>
                                        emojiToImageTag(weapon.emoji)
                                    )}
                                </div>
                            </span>

                            {/* <div>
                                <RadarChart
                                    cx={65}
                                    cy={50}
                                    outerRadius={25}
                                    width={150}
                                    height={80}
                                    data={archetypeData}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar
                                        name="Mike"
                                        dataKey="A"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </div> */}

                            <div className="flex justify-center mt-auto mb-1">
                                {player.readyForRound ? (
                                    <span className="text-xteamaccent italic font-extrabold uppercase">
                                        READY
                                    </span>
                                ) : (
                                    <span className="italic text-gray-700">
                                        Waiting Action
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
};

export default InspectArenaPlayerCard;
