import { emojiToImageTag } from "../../helpers/emojiHelper";
import { truncateText } from "../../helpers/textHelper";
import PanelBox from "../PanelBox";

interface IProps {
    player: IArenaPlayer;
}

const InspectArenaPlayerCard = function InspectArenaPlayerCard({
    player,
}: IProps) {
    return (
        <span className="mr-2 mb-2">
            <PanelBox>
                <div className="flex -m-2">
                    <div className="mr-4 w-28">
                        <img
                            className="w-20 h-20 rounded-full mb-2 mx-auto"
                            src={player.photoUrl}
                            alt={player.name}
                        />
                        <div className="font-semibold text-lg text-center mb-2">
                            {truncateText(player.name, 8)}
                        </div>
                        <div className="font-semibold text-lg text-center mb-2 flex justify-center items-center">
                            {emojiToImageTag(":health-heart:", "w-4 h-4")}
                            <span className="text-base ml-2">
                                {player.health}
                            </span>
                        </div>
                    </div>

                    <div className="w-24">
                        <span className="text-gray-400 thin font-sans text-center flex justify-end items-center mb-2">
                            {emojiToImageTag(player.team.emoji, "h-8 w-8")}
                        </span>

                        <span className="text-gray-400 thin font-sans text-center flex ">
                            {player.weapons.map((weapon) =>
                                emojiToImageTag(weapon.emoji)
                            )}
                        </span>

                        <span className="text-gray-400 thin font-sans text-center flex  items-center mt-4">
                            {emojiToImageTag(":arena-armor-epic:", "h-5 w-5")}
                        </span>

                        <span className="text-gray-400 thin font-sans text-center flex  items-center mt-4">
                            <span className="mr-1 font-bold">4</span>
                            {emojiToImageTag(":medkit:", "h-5 w-5")}
                        </span>
                    </div>
                </div>
            </PanelBox>
        </span>
    );
};

export default InspectArenaPlayerCard;
