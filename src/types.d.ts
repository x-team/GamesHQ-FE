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
    id: number;
    name: string;
    emoji: string;
    usageLimit: number | null;
    isArchived: boolean;
    _itemRarityId: TArenaRarity;
    _weapon: IWeaponData;
    _traits: ITrait[];
    _gameItemAvailability: IGameItemAvailability[]
}

interface ITrait {
    id: string;
    displayName: string;
    shortDescription: string;
}

interface IAvailableTrait {
    id: string;
    displayName: string;
}

interface IGameItemAvailability {
    _gameTypeId: string;
    _itemId: number;
    isActive: boolean;
    isArchived: boolean;
    _gameType: GameType;
}

interface IEnemy {
    name: string;
    emoji: string;
}

interface IWeaponData {
    minorDamageRate: number;
    majorDamageRate: number;
}

type TArenaRarity = "Common" | "Rare" | "Epic" | "Legendary";

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

interface IWeaponEditorData {
    id?: number;
    name: string;
    emoji: string;
    rarity: string;
    isArchived: boolean;
    minorDamageRate: number;
    majorDamageRate: number;
    usageLimit: number | null;
    traits: string[];
    gameAvailability: string[];
}