export const RARITY = {
    Common: "Common",
    Rare: "Rare",
    Epic: "Epic",
    Legendary: "Legendary",
}

const rarityToTextColorMap: { [id: string]: string } = {
    Common: "text-blue-600",
    Rare: "text-green-600",
    Epic: "text-purple-600",
    Legendary: "text-orange-600",
};

export const rarityToTextColor = (rarity: string) => {
    return rarityToTextColorMap[rarity] || "";
};
