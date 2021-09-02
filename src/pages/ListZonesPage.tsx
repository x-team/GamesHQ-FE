import { emojiToImageTag } from "../helpers/emojiHelper";
import { rarityToTextColor } from "../helpers/rarityHelper";
import Button from "../ui/Button";

const ListZonesPage = function ListZonesPage(props: any) {
    const zones: any = [];

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">ZONES</h2>

            <div className="mt-4">
                <a href="/zones/new">
                    <Button>New Zone</Button>
                </a>
            </div>

            <div className="mt-4">
                {zones.map((zone: any, index: number) => (
                    <span key={index}>
                        <div
                            className={`grid grid-cols-4 justify-between font-bold uppercase ${
                                zone.isArchived ? "opacity-20" : ""
                            } ${rarityToTextColor(zone._itemRarityId)}`}
                        >
                            <div className="flex">
                                {emojiToImageTag(zone.emoji, "h-12 w-12")}
                                <div className={`ml-2 flex flex-col`}>
                                    <span>
                                        {zone.name}
                                        {zone.isArchived ? " (Archived)" : ""}
                                    </span>
                                    <span className="font-normal text-sm">
                                        {zone._itemRarityId}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">DAMAGE</span>
                                <span className="text-xl text-black">
                                    {zone._zone.minorDamageRate} ~{" "}
                                    {zone._zone.majorDamageRate}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-400">
                                    USAGE LIMIT
                                </span>
                                <span className="text-xl text-black">
                                    {zone.usageLimit || "∞"}
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

export default ListZonesPage;
