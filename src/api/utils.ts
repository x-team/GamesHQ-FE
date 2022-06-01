import axiosImport from "axios";

export const gamesHqUrl = process.env.REACT_APP_GAMESHQ_API_URL;

export const getAxiosInstance = async () => {
  let session = localStorage.getItem("session");
  let headers = {};
  if (session) {
    const JSONSession = JSON.parse(session) as GamesAPISession;
    const XTUAuthHeader = { "xtu-session-token": JSONSession.token };
    headers = {
      ...headers,
      ...XTUAuthHeader,
    };
  }
  return axiosImport.create({
    baseURL: gamesHqUrl,
    headers,
  });
};
