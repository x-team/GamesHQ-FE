import { gamesHqUrl, getAxiosInstance } from "./utils";
import { GameResponse } from "../SlackBlockKit";

export const getAllEmoji = async () => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/admin/getEmoji";
  const response = await axios.get(endpoint);
  const allEmoji = response.data.emoji as IAllEmoji;

  return allEmoji;
};

export const getActiveArenaGame = async () => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/dashboard/admin/arena/getState";
  const response = await axios.get(endpoint);
  const arenaGame = response.data.arenaGame as IGame;

  return arenaGame;
};

export const postArenaCommand = async (command: string): Promise<GameResponse> => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/dashboard/admin/arena/command";
  const response = await axios.post(endpoint, {
    command
  });
  const gameCommandResponse = response.data as GameResponse;

  return gameCommandResponse;
};

export const postArenaAction = async (action: string, value?: string[]): Promise<GameResponse> => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/dashboard/admin/arena/action";
  const response = await axios.post(endpoint, {
    action,
    value
  });
  const gameCommandResponse = response.data as GameResponse;

  return gameCommandResponse;
};


// 🔫 Weapons

export const getWeapons = async () => {
  const axios = await getAxiosInstance();
  const endpoint = gamesHqUrl + "/dashboard/admin/getWeapons";

  const response = await axios.get(endpoint);
  const itemWeapons = response.data.weapons as IWeapon[];

  return itemWeapons;
};

export const getWeapon = async (weaponId: number) => {
  const axios = await getAxiosInstance();
  const endpoint = gamesHqUrl + `/dashboard/admin/weapons/${weaponId}`;

  const response = await axios.get(endpoint);
  const itemWeapon = response.data.weapon as IWeapon;

  return itemWeapon;
};

export const upsertWeapon = async (data: IWeaponEditorData) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/dashboard/admin/upsertWeapon";
  await axios.post(endpoint, data);
};

export const deleteWeapon = async (weaponId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/weapons/${weaponId}`;
  await axios.delete(endpoint);
};

// 👹 Enemies

export const getEnemy = async (enemyId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/enemies/${enemyId}`;
  const response = await axios.get(endpoint);
  const enemy = response.data.enemy as IEnemy;

  return enemy;
};

export const getEnemies = async () => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/enemies`;
  const response = await axios.get(endpoint);
  const enemy = response.data.enemies as IEnemy[];

  return enemy;
};

export const upsertEnemy = async (data: IEnemyEditorData) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/dashboard/admin/upsertEnemy";
  await axios.post(endpoint, data);
};

export const deleteEnemy = async (enemyId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/enemies/${enemyId}`;
  await axios.delete(endpoint);
};

// 🏠 Zones

export const getZones = async () => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/zones`;
  const response = await axios.get(endpoint);
  const zones = response.data.zones as IZone[];

  return zones;
};

export const getZone = async (zoneId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/zones/${zoneId}`;
  const response = await axios.get(endpoint);
  const zone = response.data.zone as IZone;

  return zone;
};

export const upsertZone = async (data: IZoneEditorData) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/dashboard/admin/upsertZone";
  await axios.post(endpoint, data);
};

export const deleteZone = async (zoneId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/zones/${zoneId}`;
  await axios.delete(endpoint);
};

// 🏯 TOWER GAMES

export const getCurrentTowerGameStatus = async () => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/tower-games/status`;
  const response = await axios.get(endpoint);
  const towerGame = response.data.towerGame as IGameWithTower;

  return towerGame;
};

export const createTowerGame = async (data: ICreateTowerGameData) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/dashboard/admin/tower-games/new";
  await axios.post(endpoint, data);
};

export const endCurrentTowerGame = async () => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/tower-games/end-current-game`;
  await axios.post(endpoint);
};

export const openOrCloseCurrentTowerGame = async (open: boolean) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/tower-games/open-or-close`;
  await axios.post(endpoint, {
    open,
  });
};

// 🪜 Floors

export const updateFloor = async (floorId: number, data: IUpdateFloorData) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/admin/floors/${floorId}/addEnemies`;
  await axios.post(endpoint, data);
};
