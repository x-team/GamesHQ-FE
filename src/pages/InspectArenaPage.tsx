import { mockArenaPlayers, mockArenaGame } from "../mocks/mocks";
import ArenaStatusCard from "../ui/ArenaStatusCard";
import InspectArenaPlayerCard from "../ui/InspectArenaPlayerCard";

const InspectArenaPage = function InspectArenaPage(props: any) {
    const alivePlayers = mockArenaPlayers.filter(
        (player) => player.health > 0 && !player.isSpectator
    );
    const deadPlayers = mockArenaPlayers.filter(
        (player) => player.health <= 0 && !player.isSpectator
    );
    const spectators = mockArenaPlayers.filter((player) => player.isSpectator);

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                INSPECT ARENA
            </h2>

            <ArenaStatusCard arenaGame={mockArenaGame} />

            <div className="mt-4 text-lg font-bold">
                {mockArenaPlayers.length} total players
            </div>
            <div className="text-sm font-thin mb-2">
                {alivePlayers.length} alive, {deadPlayers.length} dead,{" "}
                {spectators.length} spectators
            </div>

            <div className="flex flex-wrap">
                {mockArenaPlayers.map((player, index) => (
                    <InspectArenaPlayerCard key={index} player={player} />
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
        </div>
    );
};

export default InspectArenaPage;
