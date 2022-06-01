import { gamesHqUrl, getAxiosInstance } from "./utils";

export const checkSession = async (token: string) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/general/login/session`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const logOutFromGamesAPI = async (token: string) => {
  const axios = await getAxiosInstance();

  const endpoint = gamesHqUrl + `/general/logout`;
  const response = await axios.get(endpoint);
  return response.data;
};
