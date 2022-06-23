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
  const game = response.data.game as IGameType;

  return game;
};

export const upsertLeaderboard = async (gameTypeId: number, data: ILeaderboard) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/leaderboards/${data.id}`;
  await axios.post(endpoint, data);
};

export const deleteLeaderboard = async (gameTypeId: number, leaderboardId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/leaderboards/${leaderboardId}`;
  await axios.delete(endpoint);
};
