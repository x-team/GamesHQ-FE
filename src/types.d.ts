interface IUser {
  id?: number;
  email: string;
  slackId: string;
  displayName: string;
  profilePictureUrl: string;
  _team: ITeam;
}

interface IGameType {
  id: string;
  clientSecret: string;
  signingSecret: string;
  _createdById: number;
  description?: string;
  isEnabled?: boolean;
  targetValue?: string;
  createdAt?: string;
  updatedAt?: string;
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

interface IZone {
  id?: number;
  name: string;
  isActive: boolean;
  isArchived: boolean;
  emoji: string;
  ring: string;
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
  _gameItemAvailability: IGameItemAvailability[];
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
  id?: number;
  name: string;
  emoji: string;
  gifUrl: string;
  minorDamageRate: number;
  majorDamageRate: number;
  health: number;
  isBoss: boolean;

  _enemyPatternId: string;
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
  startedAt: string;
  endedAt: string;
  _gameTypeId: number;
  _arena: IArenaGame;
}

interface IGameWithTower extends IGame {
  _tower: ITowerGame;
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

interface IGameTypeEditorData {
  id: string;
  // These will be added later
  // clientSecret: string;
  // signingSecret: string;
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

interface IEnemyEditorData {
  id?: number;
  name: string;
  emoji: string;
  gifUrl: string;
  minorDamageRate: number;
  majorDamageRate: number;
  health: number;
  isBoss: boolean;
  abilitiesJson: {
    [k: string]: any;
  };
  actionPattern: string;
}

interface IZoneEditorData {
  id?: number;
  name: string;
  emoji: string;
  ring: string;
  isArchived: boolean;
}

interface ITowerGame {
  id?: number;
  lunaPrize: number;
  height: number;
  coinPrize: number;
  isOpen: boolean;
  _game?: IGame;
  _gameId: number;
  _floors?: ITowerFloor[];
}

interface ITowerFloor {
  id?: number;
  number: number;
  isEveryoneVisible: boolean;
  _floorEnemies?: ITowerFloorEnemy[];
  _towerGameId: number;
}

interface ITowerFloorEnemy {
  id: number;
  _enemyId: number;
  _towerFloorid: number;
  _enemy: IEnemy;
}

interface ICreateTowerGameData {
  name: string;
  height: number;
}

interface IAllEmoji {
  [k: string]: string;
}

interface IUpdateFloorData {
  enemyIds: number[];
}

interface IUserFirestoreData {
  fullName: string;
  role: TRole;
}

type TRole = "admin" | "user";
