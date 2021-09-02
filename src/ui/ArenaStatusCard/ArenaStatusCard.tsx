import PanelBox from "../PanelBox";

interface IProps {
    arenaGame: IGame;
}

const ArenaStatusCard = function ArenaStatusCard({ arenaGame }: IProps) {
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
                    <button className="bg-xteamaccent text-sm text-white py-1.5 px-5 rounded-sm">
                        GIVE WEAPON TO EVERYONE
                    </button>
                    <button className="bg-gray-100 text-sm text-gray-400 py-1.5 px-5 rounded-sm cursor-not-allowed">
                        RESTRICT WEAPONS
                    </button>
                    <button className="bg-gray-100 text-sm text-gray-400 py-1.5 px-5 rounded-sm cursor-not-allowed">
                        RESTRICT ZONES
                    </button>
                </div>
            </div>
        </PanelBox>
    );
};

export default ArenaStatusCard;
