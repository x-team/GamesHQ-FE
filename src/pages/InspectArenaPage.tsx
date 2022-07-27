import { useEffect, useState } from "react";
import { get } from "lodash";

import Button from "../ui/Button";
import { getActiveArenaGame } from "../api/admin";
import ArenaStatusCard from "../ui/ArenaStatusCard";
import { handleGameResponse } from "../helpers/slackHelper"
import { postArenaCommand } from "../api/admin";
import InspectArenaPlayerCard from "../ui/InspectArenaPlayerCard";
import { ARENA_SLACK_COMMANDS } from "../helpers/arenaHelper"
import { toast } from "react-toastify";

const InspectArenaPage = function InspectArenaPage(props: any) {
    const [arenaGame, setArenaGame] = useState<IGame | undefined>(undefined);

     const handleArenaCommandOnClick = async (command: string) => {
        handleGameResponse({
            adminGameRequest: () => postArenaCommand(command),
            onSuccessBlocks: (blocks) => {
                toast(`OK: ${blocks}`, {
                    type: "success",
                });
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

    useEffect(() => {
        async function fetchArenaGame() {
            const game = await getActiveArenaGame();
            setArenaGame(game);
        }

        fetchArenaGame();
    }, []);

    const arenaPlayers = get(
        arenaGame,
        "_arenaPlayers",
        []
    ) as IArenaPlayer[];

    const alivePlayers = arenaPlayers.filter(
        (player) => player.health > 0 && !player.isSpectator
    );
    const deadPlayers = arenaPlayers.filter(
        (player) => player.health <= 0 && !player.isSpectator
    );
    const spectators = arenaPlayers.filter((player) => player.isSpectator);

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                INSPECT ARENA
            </h2>

            {arenaGame ? (
                <>
                    <ArenaStatusCard arenaGame={arenaGame} />

                    <div className="mt-4 text-lg font-bold">
                        {arenaPlayers.length} total players
                    </div>
                    <div className="text-sm font-thin mb-2">
                        {alivePlayers.length} alive, {deadPlayers.length} dead,{" "}
                        {spectators.length} spectators
                    </div>

                    <div className="flex flex-wrap">
                        {arenaPlayers.map((player, index) => (
                            <InspectArenaPlayerCard
                                key={index}
                                player={player}
                            />
                        ))}
                        {/* {mockArenaPlayers.map((player, index) => (
                            <InspectArenaPlayerCard key={index} player={player} />
                        ))}
                        {mockArenaPlayers.map((player, index) => (
                            <InspectArenaPlayerCard key={index} player={player} />
                        ))}
                        {mockArenaPlayers.map((player, index) => (
                            <InspectArenaPlayerCard key={index} player={player} />
                        ))} */}
                    </div>
                </>
            ) : (
            <Button type="submit" onClick={handleNewGameOnClick}>
                    NEW GAME
            </Button>
        )}
        </div>
    );
};

export default InspectArenaPage;
