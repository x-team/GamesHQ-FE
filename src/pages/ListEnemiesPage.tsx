import { emojiToImageTag } from "../helpers/emojiHelper";
import { rarityToTextColor } from "../helpers/rarityHelper";
import Button from "../ui/Button";

const ListEnemiesPage = function ListEnemiesPage(props: any) {
    const sortedEnemies = [].sort((a: IEnemy, b: IEnemy) => {
        return 0;
    });

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                ENEMIES
            </h2>

            <div className="mt-4">
                <a href="/enemies/new">
                    <Button>New Enemy</Button>
                </a>
            </div>

            <div className="mt-4">
                {sortedEnemies.map((enemy: IEnemy, index) => (
                    <span key={index}>
                        {/* <div
                            className={`grid grid-cols-4 justify-between font-bold uppercase ${
                                weapon.isArchived ? "opacity-20" : ""
                            } ${rarityToTextColor(weapon._itemRarityId)}`}
                        >
                            <div className="flex">
                                {emojiToImageTag(weapon.emoji, "h-12 w-12")}
                                <div className={`ml-2 flex flex-col`}>
                                    <span>
                                        {weapon.name}
                                        {weapon.isArchived ? " (Archived)" : ""}
                                    </span>
                                    <span className="font-normal text-sm">
                                        {weapon._itemRarityId}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">DAMAGE</span>
                                <span className="text-xl text-black">
                                    {weapon._weapon.minorDamageRate} ~{" "}
                                    {weapon._weapon.majorDamageRate}
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
                        </div> */}
                        <hr className="my-2" />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ListEnemiesPage;
