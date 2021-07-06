import { emojiToImageTag } from "../helpers/emojiHelper";
import { rarityToTextColor } from "../helpers/rarityHelper";
import { mockAllWeapons } from "../mocks/mocks";
import Button from "../ui/Button";

const ListWeaponsPage = function ListWeaponsPage(props: any) {
    const sortedWeapons = mockAllWeapons.sort((a, b) => {
        const rarityToNumber = {
            COMMON: 0,
            RARE: 1,
            EPIC: 2,
            LEGENDARY: 3,
        };
        const aRarityNumber = rarityToNumber[a.arenaRarity];
        const bRarityNumber = rarityToNumber[b.arenaRarity];
        if (aRarityNumber > bRarityNumber) return -1;
        else if (bRarityNumber > aRarityNumber) return 1;
        return 0;
    });

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                WEAPONS
            </h2>

            <div className="mt-4">
                <a href="/weapons/new">
                    <Button>New Weapon</Button>
                </a>
            </div>

            <div className="mt-4">
                {sortedWeapons.map((weapon: IWeapon, index) => (
                    <span>
                        <div
                            className={`grid grid-cols-4 justify-between font-bold uppercase ${
                                weapon.isArchived ? "opacity-20" : ""
                            } ${rarityToTextColor(weapon.arenaRarity)}`}
                        >
                            <div className="flex">
                                {emojiToImageTag(weapon.emoji, "h-12 w-12")}
                                <div className={`ml-2 flex flex-col`}>
                                    <span>
                                        {weapon.name}
                                        {weapon.isArchived ? " (Archived)" : ""}
                                    </span>
                                    <span className="font-normal text-sm">
                                        {weapon.arenaRarity}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">DAMAGE</span>
                                <span className="text-xl text-black">
                                    {weapon.minorDamageRate} ~{" "}
                                    {weapon.majorDamageRate}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-400">
                                    USAGE LIMIT
                                </span>
                                <span className="text-xl text-black">
                                    {weapon.usageLimit || "∞"}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-400">TRAITS</span>
                                <span className="text-sm font-n text-black">
                                    PRECISION, PIERCING
                                </span>
                            </div>
                        </div>
                        <hr className="my-2" />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ListWeaponsPage;
