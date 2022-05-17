import { gamesHqUrl, getAxiosInstance } from "./utils";

export const getGameTypes = async () => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games`;
  const response = await axios.get(endpoint);
  const games = response.data.games as IGameType[];

  return games;
};

export const getGameType = async (gameTypeId: string) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}`;
  const response = await axios.get(endpoint);
  const game = response.data.game as IGameType;

  return game;
};

export const upsertGameType = async (data: IGameTypeEditorData) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + "/dashboard/game-dev/games/upsertGameType";
  await axios.post(endpoint, data);
};

export const deleteGameType = async (gameTypeId: string) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}`;
  await axios.delete(endpoint);
};
