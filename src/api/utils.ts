import axiosImport from "axios";
import app from "../firebase/firebase";

export const gamesHqUrl = process.env.REACT_APP_GAMESHQ_API_URL;

export const getAxiosInstance = async () => {
  const firebaseIdToken = await app.auth().currentUser?.getIdToken();
  return axiosImport.create({
    baseURL: gamesHqUrl,
    params: {
      firebaseIdToken: firebaseIdToken,
    },
  });
};
