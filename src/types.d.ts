interface IArenaPlayer {
    name: string;
    photoUrl: string;
    health: number;
    weapons: IWeapon[];
    team: IPlayerTeam;
    isSpectator: boolean;
    readyForRound: boolean;
}

interface IWeapon {
    name: string;
    emoji: string;
    minorDamageRate: number;
    majorDamageRate: number;
    usageLimit: number | null;
    isActive: boolean;
    arenaRarity: TArenaRarity;
    isArchived: boolean;
}

type TArenaRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

interface IPlayerTeam {
    name: string;
    emoji: string;
}

interface IArenaGame {
    name: string;
    isActive: boolean;
    teamBased: boolean;
    hasZoneDeactivation: boolean;
    currentRingDeactivation: number;
    ringSystemAlgorithm: number;
    inactiveZonePenaltyPower: number;
}

interface IArenaRoundAction {
    isCompleted: boolean;
    actionJson: any;
}
