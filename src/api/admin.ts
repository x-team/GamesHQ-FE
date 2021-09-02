import axios from "axios";

export const getActiveArenaGame = async () => {
    const response = await axios.get(
        "http://local-ccmj-arena.ngrok.io/dashboard/admin/arena/getState"
    );
    const arenaGame = response.data.arenaGame as IGame;

    return arenaGame;
};
