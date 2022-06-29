import { gamesHqUrl, getAxiosInstance } from "./utils";

export const getGameTypeLeaderboards = async (gameTypeId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/leaderboards`;
  const response = await axios.get(endpoint);
  const leaderboards = response.data.games as ILeaderboard[];

  return leaderboards;
};

export const getLeaderboard = async (gameTypeId: number, leaderboardId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/leaderboards/${leaderboardId}`;
  const response = await axios.get(endpoint);
  const game = response.data.game as ILeaderboard;

  return game;
};

export const getLeaderboardResults = async (gameTypeId: number, leaderboardId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/leaderboards/${leaderboardId}/results`;
  const response = await axios.get(endpoint);
  const game = response.data.game as ILeaderboardResult[];

  return game;
};

export const upsertLeaderboard = async (data: ILeaderboard) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${data._gameTypeId}/leaderboards`;
  await axios.post(endpoint, data);
};

export const deleteLeaderboard = async (gameTypeId: number, leaderboardId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/leaderboards/${leaderboardId}`;
  await axios.delete(endpoint);
};
