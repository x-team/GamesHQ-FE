import { mockArenaPlayers } from "../mocks/mocks";
import InspectArenaPlayerCard from "../ui/InspectArenaPlayerCard/InspectArenaPlayerCard";
const InspectArenaPage = function InspectArenaPage(props: any) {
    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                INSPECT ARENA
            </h2>

            <div className="flex flex-wrap">
                {mockArenaPlayers.map((player, index) => (
                    <InspectArenaPlayerCard key={index} player={player} />
                ))}
            </div>
        </div>
    );
};

export default InspectArenaPage;
