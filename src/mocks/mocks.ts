export const nightclawTeam: IPlayerTeam = {
    name: "Nightclaw",
    emoji: ":nightclaw:",
};

export const corgiTeam: IPlayerTeam = {
    name: "House Corgi",
    emoji: ":corgi:",
};

export const rcEnvisioner: IWeapon = {
    name: "RC06 Envisioner",
    emoji: ":rc06-envisioner:",
};

export const watchmanChronogun: IWeapon = {
    name: "Watchman's Chronogun",
    emoji: ":watchman's-chronogun:",
};

export const mockArenaPlayers: IArenaPlayer[] = [
    {
        name: "Ed",
        photoUrl:
            "https://ca.slack-edge.com/T0257R0RP-UBRBZRHQD-c434a75d14f6-512",
        health: 100,
        team: nightclawTeam,
        weapons: [watchmanChronogun],
    },
    {
        name: "Lauren",
        photoUrl:
            "https://ca.slack-edge.com/T0257R0RP-U01Q8HYH5V5-04b052e801d6-512",
        health: 54,
        team: nightclawTeam,
        weapons: [watchmanChronogun],
    },
    {
        name: "Barklund",
        photoUrl:
            "https://ca.slack-edge.com/T0257R0RP-UMF26ULH0-862d34507166-512",
        health: 77,
        team: corgiTeam,
        weapons: [watchmanChronogun, rcEnvisioner],
    },
];
