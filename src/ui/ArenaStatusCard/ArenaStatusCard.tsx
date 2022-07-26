import PanelBox from "../PanelBox";
import Button from "../../ui/Button";
import { postArenaCommand } from "../../api/admin";
import { ARENA_SLACK_COMMANDS } from "../../helpers/arenaHelper"
import { toast } from "react-toastify";
import ArenaCommandModal from "../ArenaCommandModal"
import { useState } from "react";
import { SlackBlockKitLayoutElement } from "../../SlackBlockKit";
interface IProps {
    arenaGame: IGame;
}

const ArenaStatusCard = function ArenaStatusCard({ arenaGame }: IProps) {
      const [showArenaCommandModal, setShowArenaCommandModal] = useState<boolean>(false);
      const [slackBlocks, setSlackBlocks] = useState<SlackBlockKitLayoutElement[]>([]);

    const handleGiveWeaponsToEveryOneOnClick = async () => {
        try{
            const resp = await postArenaCommand(ARENA_SLACK_COMMANDS.GIVE_EVERYONE_WEAPON)
            if(resp.blocks){
                setSlackBlocks(resp.blocks)
                setShowArenaCommandModal(true)
            }
        } catch(err: any) {
            toast(`Error giving weapons to everyone. ${err?.message} `, {
                type: 'error',
            })
        }
    };

    
    const handleCloseModal = () => {
        setShowArenaCommandModal(false)
    }

    return (
        <PanelBox>
            <span className="text-xteamaccent font-bold font-sans text-lg italic uppercase">
                {arenaGame.name}
            </span>
            {arenaGame.isActive ? (
                <div className="font-bold text-green-600">ACTIVE</div>
            ) : (
                ""
            )}

            <div className="mt-8">
                <button className="bg-xteamaccent text-sm text-white py-1.5 px-5 rounded-sm">
                    START ROUND
                </button>
                <hr className="my-4" />
                <div className="flex gap-4">
                    <button className="bg-xteamaccent text-sm text-white py-1.5 px-5 rounded-sm">
                        LIST PLAYERS
                    </button>
                    <Button type="submit" onClick={handleGiveWeaponsToEveryOneOnClick}>
                        GIVE WEAPON TO EVERYONE
                    </Button>
                    <button className="bg-gray-100 text-sm text-gray-400 py-1.5 px-5 rounded-sm cursor-not-allowed">
                        RESTRICT WEAPONS
                    </button>
                    <button className="bg-gray-100 text-sm text-gray-400 py-1.5 px-5 rounded-sm cursor-not-allowed">
                        RESTRICT ZONES
                    </button>
                </div>
            </div>

            {showArenaCommandModal && <ArenaCommandModal show={showArenaCommandModal} onClose={handleCloseModal} slackBlocks={slackBlocks}/>}
        </PanelBox>
    );
};

export default ArenaStatusCard;
