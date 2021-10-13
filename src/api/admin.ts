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

export const getWeapon = async (weaponId: number) => {
    const endpoint = gamesHqUrl + `/dashboard/admin/weapons/${weaponId}`;
    const response = await axios.get(endpoint);
    const itemWeapon = response.data.weapon as IWeapon;

    return itemWeapon;
}

export const upsertWeapon = async (data: IWeaponEditorData) => {
    const endpoint = gamesHqUrl + "/dashboard/admin/upsertWeapon";
    await axios.post(endpoint, data)
}