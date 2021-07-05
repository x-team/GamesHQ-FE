interface IArenaPlayer {
    name: string;
    photoUrl: string;
    health: number;
    weapons: IWeapon[];
    team: IPlayerTeam;
}

interface IWeapon {
    name: string;
    emoji: string;
}

interface IPlayerTeam {
    name: string;
    emoji: string;
}
