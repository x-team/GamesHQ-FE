import { gamesHqUrl, getAxiosInstance } from "./utils";

export const getAchievements = async (gameTypeId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/achievements`;
  const response = await axios.get(endpoint);
  const achievements = response.data;
  
  return achievements;
};

export const getAchievement = async (gameTypeId: number, achievementId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/achievements/${achievementId}`;
  const response = await axios.get(endpoint);
  const acheivement = response.data.game as IGameType;

  return acheivement;
};

export const upsertAchievement = async (data: IAchievement) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${data._gameTypeId}/achievements`;
  await axios.post(endpoint, data);
};

export const deleteAcheivement = async (gameTypeId: number, achievementId: number) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/dashboard/game-dev/games/${gameTypeId}/achievements/${achievementId}`;
  await axios.delete(endpoint);
};
