import PanelBox from "../PanelBox";
import Button from "../../ui/Button";
import { postArenaCommand } from "../../api/admin";
import { ARENA_SLACK_COMMANDS } from "../../helpers/arenaHelper"
import { handleGameResponse } from "../../helpers/slackHelper"
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

    const handleArenaCommandOnClick = async (command: string) => {
        handleGameResponse({
            adminGameRequest: () => postArenaCommand(command),
            onSuccessBlocks: (blocks) => {
                setSlackBlocks(blocks)
                setShowArenaCommandModal(true)
            }, 
            onSuccessText: (text) => {
                toast(`OK: ${text}`, {
                    type: "success",
                });
            },
            onError: (resp) => {
                toast(`Error : ${resp.text}`, {
                    type: "error",
                });
            } 
        })
    };

    const handleNewGameOnClick = async () => {
        await handleArenaCommandOnClick(ARENA_SLACK_COMMANDS.NEW_GAME)
    }

    const handleStartRoundOnClick = async () => {
        await handleArenaCommandOnClick(ARENA_SLACK_COMMANDS.START_ROUND)
    }

    const handleEndGameOnClick = async () => {
        await handleArenaCommandOnClick(ARENA_SLACK_COMMANDS.END_GAME)
    }

    const handleListPlayersOnClick = async () => {
        await handleArenaCommandOnClick(ARENA_SLACK_COMMANDS.LIST_PLAYERS)
    }

    const handleGiveWeaponsToEveryOneOnClick = async () => {
        await handleArenaCommandOnClick(ARENA_SLACK_COMMANDS.GIVE_EVERYONE_WEAPON)
    };

    const handleRestrictWeaponsOnClick = async () => {
        await handleArenaCommandOnClick(ARENA_SLACK_COMMANDS.NARROW_WEAPONS)
    };

    const handleRestrictZonesOnClick = async () => {
        await handleArenaCommandOnClick(ARENA_SLACK_COMMANDS.NARROW_ZONES)
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
                <div className="flex gap-4">
                    <Button type="submit" onClick={handleStartRoundOnClick}>
                        START ROUND
                    </Button>
                    <Button type="submit" onClick={handleEndGameOnClick}>
                        END GAME
                    </Button>
                </div>
                <hr className="my-4" />
                <div className="flex gap-4">
                    <Button type="submit" onClick={handleListPlayersOnClick}>
                        LIST PLAYERS
                    </Button>
                    <Button type="submit" onClick={handleGiveWeaponsToEveryOneOnClick}>
                        GIVE WEAPON TO EVERYONE
                    </Button>
                    <Button type="submit" onClick={handleRestrictWeaponsOnClick}>
                        RESTRICT WEAPONS
                    </Button>
                    <Button type="submit" onClick={handleRestrictZonesOnClick}>
                        RESTRICT ZONES
                    </Button>
                </div>
            </div>

            {showArenaCommandModal && <ArenaCommandModal show={showArenaCommandModal} onClose={handleCloseModal} slackBlocks={slackBlocks}/>}
        </PanelBox>)
};

export default ArenaStatusCard;
