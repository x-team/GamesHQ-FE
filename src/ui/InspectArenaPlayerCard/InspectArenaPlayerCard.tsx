import React from "react";
import { emojiToImageLabel } from "../../helpers/emojiHelper";
import { truncateText } from "../../helpers/textHelper";

interface IProps {
    player: IArenaPlayer;
}

const InspectArenaPlayerCard = function InspectArenaPlayerCard({
    player,
}: IProps) {
    const medKits = player._weapons.filter(item => item.type === 'medical kit');
    const armors = player._weapons.filter(item => item.type === 'armor');
    const weapons = player._weapons.filter(item => item.type === 'weapon');

    return (
        <span className="mr-2 mb-2">
            <div
                className={`w-max bg-white rounded-lg border flex flex-col cursor-pointer ${
                    player.health ? "border-xteamaccent" : "border-gray-200"
                }`}
            >
                <div className="flex">
                    <div className="w-32 flex flex-col justify-center items-center">
                        <img
                            className="w-12 h-12 rounded-full mb-1 "
                            src={player._user.profilePictureUrl}
                            alt={`${player._user.displayName}'s profile`}
                        />
                        <div className="font-semibold text-center">
                            {truncateText(player._user.displayName, 16)}
                        </div>
                        <div className="font-semibold text-lg text-center flex justify-center items-center">
                            {emojiToImageLabel(":health-heart:", {}, "w-4 h-4")}
                            <span className="text-base ml-1">
                                {player.health}
                            </span>
                            {armors && armors.length > 0 && emojiToImageLabel(
                                armors.length === 1 ? armors[0].emoji : ":arena-armor-rare:",
                                {},
                                "h-5 w-5 ml-2"
                            )}
                        </div>

                        <span className="thin font-sans text-center flex items-center justify-center mt-1 gap-1">
                            <span className="flex items-center">
                                <span className="mr-1">{medKits.length}</span>
                                {emojiToImageLabel(":medkit:", {}, "h-5 w-5")}
                            </span>
                            <span className="flex items-center">
                                <span className="mr-1">112</span>
                                {emojiToImageLabel(":cheer-star:", {}, "h-5 w-5")}
                            </span>
                        </span>
                    </div>

                    <div className="w-32 bg-gray-100 rounded-br-lg rounded-tr-lg h-36">
                        <div className="relative h-full flex flex-col">
                            <div className="absolute mt-2">
                                <span className="text-gray-400 thin font-sans text-center flex justify-center items-center mb-2 opacity-5">
                                    {emojiToImageLabel(
                                        player?._team?.emoji || ":corgi:",
                                        {},
                                        "h-32 w-32"
                                    )}
                                </span>
                            </div>

                            <span className="text-gray-400 thin font-sans text-center flex ml-4">
                                <div className="mt-2 flex flex-wrap">
                                    {weapons.map((weapon) =>
                                        <React.Fragment key={weapon.id}>
                                            {emojiToImageLabel(weapon.emoji, {})}
                                        </React.Fragment>
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
                                {player.health ? (
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
