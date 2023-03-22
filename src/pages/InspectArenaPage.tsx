import { useEffect, useState } from "react";
import { get } from "lodash";

import { getActiveArenaGame } from "../api/admin";
import ArenaStatusCard from "../ui/ArenaStatusCard";
import InspectArenaPlayerCard from "../ui/InspectArenaPlayerCard";

const InspectArenaPage = function InspectArenaPage(props: any) {
    const [arenaGame, setArenaGame] = useState<IGame | undefined>(undefined);

    const onArenaUpdate = () => {
        fetchArenaGame()
    }

    async function fetchArenaGame() {
        const game = await getActiveArenaGame();
        setArenaGame(game);
    }

    useEffect( () => {
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


                <>
                    <ArenaStatusCard arenaGame={arenaGame} onUpdate={onArenaUpdate} />
                    
                    {arenaGame ? (
                        <div>
                            <div className="mt-4 text-lg font-bold">
                                {arenaPlayers.length} total players
                            </div>
                            <div className="text-sm font-thin mb-2">
                                {alivePlayers.length} alive, {deadPlayers.length} dead,{" "}
                                {spectators.length} spectators
                            </div>

                            <div className="flex flex-wrap">
                                {arenaPlayers.map((player) => (
                                    <InspectArenaPlayerCard
                                        key={player._userId}
                                        player={player}
                                    />
                                ))}
                            </div>
                        </div>
                ): ("") }
                </>
               
        </div>
    );
};

export default InspectArenaPage;
