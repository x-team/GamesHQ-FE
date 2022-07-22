interface IUser {
  id?: number;
  email: string;
  slackId: string;
  displayName: string;
  profilePictureUrl: string;
  _team: ITeam;
}

interface IGameType {
  id: number;
  name: string,
  clientSecret: string;
  signingSecret: string;
  _createdById: number;
  _leaderboards: ILeaderboard[]
  description?: string;
  isEnabled?: boolean;
  targetValue?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ILeaderboard {
  id?: number;
  _gameTypeId: number;
  name: string;
  scoreStrategy: string;
  resetStrategy: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ILeaderboardResult {
  id?: number;
  _leaderboardId: number;
  _userId?: number;
  _user?: IUser;
  score: number;
  _leaderboardResultsMeta?: ILeaderboardResultMeta[]
  createdAt?: string;
  updatedAt?: string;
}

interface ILeaderboardResultMeta {
  attribute?: string;
  value?: string;
}

interface IAchievement {
  id?: number;
  _gameTypeId: number;
  description: string;
  gameType?: IGameType;
  isEnabled: boolean;
  targetValue: number;
  createdAt?: string;
  updatedAt: string;
}

interface IAchievementUnlocked {
  _achievementId: number;
  _userId: number;
  _user?: IUser;
  progress: number;
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
  _gameTypeId: number;
  _itemId: number;
  isActive: boolean;
  isArchived: boolean;
  _gameType: IGameType;
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
  _arenaPlayers: [IArenaPlayer];
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

}

interface IArenaRoundAction {
  isCompleted: boolean;
  actionJson: any;
}

interface IGameTypeEditorData {
  id?: number
  name: string
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
  gameTypeIds: number[];
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

interface GamesAPIUSer {
  displayName: string;
  email: string;
  slackId: string;
  firebaseUserUid: string;
  profilePictureUrl: string;
  role: number;
  isAdmin: boolean;
  capabilities: string[];
}

interface GamesAPISession {
  token: string;
  expireTime: number;
}

interface SignInOut {
  success: boolean;
  message?: string;
}

interface SignIn extends SignInOut {
  user: GamesAPIUSer;
  session: GamesAPISession;
}
