const rarityToTextColorMap: { [id: string]: string } = {
    COMMON: "text-blue-600",
    RARE: "text-green-600",
    EPIC: "text-purple-600",
    LEGENDARY: "text-orange-600",
};

export const rarityToTextColor = (rarity: string) => {
    return rarityToTextColorMap[rarity] || "";
};
