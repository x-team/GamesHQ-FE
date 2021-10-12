import axios from "axios";

const gamesHqUrl = process.env.REACT_APP_GAMESHQ_API_URL;

export const getActiveArenaGame = async () => {
    const endpoint = gamesHqUrl + "/dashboard/admin/arena/getState";
    const response = await axios.get(endpoint);
    const arenaGame = response.data.arenaGame as IGame;

    return arenaGame;
};

export const getWeapons = async () => {
    const endpoint = gamesHqUrl + "/dashboard/admin/getWeapons";
    const response = await axios.get(endpoint);
    const itemWeapons = response.data.weapons as IWeapon[];

    return itemWeapons;
}

export const newWeapon = async (data: IWeaponEditorData) => {
    const endpoint = gamesHqUrl + "/dashboard/admin/newWeapon";
    await axios.post(endpoint, data)
}