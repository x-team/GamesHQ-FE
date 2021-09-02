interface IUser {
    id?: number;
    email: string;
    slackId: string;
    displayName: string;
    profilePictureUrl: string;
    _team: ITeam;
}

interface ITeam {
    id?: number;
    name: string;
    emoji: string;
    health: number;
    isActive: boolean;
    health: number;
}
interface IArenaPlayer {
    _user: IUser;
    health: number;
    isSpectator: boolean;
    isVisible: boolean;
    isBoss: boolean;
    luckBoost: number;
    abilitiesJSON: {
        [key: string]: number;
    };
    _team: ITeam;
    _weapons: IWeapon[];
    _userId: number;
    _teamId: number;
    _gameId: number;
    _arenaZoneId: number | null;
    _user: IUser;
}

interface IWeapon {
    name: string;
    emoji: string;
    usageLimit: number | null;
    isArchived: boolean;
    _itemRarityId: TArenaRarity;
    _weapon: IWeaponData;
}

interface IWeaponData {
    minorDamageRate: number;
    majorDamageRate: number;
}

type TArenaRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

interface IPlayerTeam {
    name: string;
    emoji: string;
}

interface IGame {
    id?: number;
    name: string;
    isActive: boolean;
    _arena: IArenaGame;
}

interface IArenaGame {
    id?: number;
    hasZoneDeactivation: boolean;
    teamBased: boolean;
    ringSystemAlgorithm: string;
    currentRingDeactivation: number;
    inactiveZonePenaltyPower: number;
    _gameId: number;
    _players: [IArenaPlayer];
}

interface IArenaRoundAction {
    isCompleted: boolean;
    actionJson: any;
}
