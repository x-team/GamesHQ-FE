import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import PlayersPage from "./pages/PlayersPage";
import InspectArenaPage from "./pages/InspectArenaPage";
import ListWeaponsPage from "./pages/ListWeaponsPage";
import WeaponEditorPage from "./pages/WeaponEditorPage";
import ListZonesPage from "./pages/ListZonesPage";
import ZoneEditorPage from "./pages/ZoneEditorPage";
import ListEnemiesPage from "./pages/ListEnemiesPage";
import EnemyEditorPage from "./pages/EnemyEditorPage";
import NotFoundPage from "./pages/NotFoundPage";
import TowerGamePage from "./pages/TowerGamePage";
import FloorsEditorPage from "./pages/FloorsEditorPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";

import playerSvg from "./assets/icons/player.svg";
import skull from "./assets/icons/skull.svg";
import sword from "./assets/icons/sword.svg";
import floor from "./assets/icons/floor.svg";
import zone from "./assets/icons/zone.svg";

import useCurrentUser from "./hooks/useCurrentUser";
import { SyncLoader } from "react-spinners";
import { XTEAM_ACCENT_COLOR } from "./helpers/colors";

interface GamesHQRouteOption {
    name: string;
    icon: string;
    to: string;
}

const inspectRoutes = [
    { name: "Inspect Arena", to: "/inspect/arena", icon: playerSvg },
];

const databaseRoutes = [
    /* { name: "Players", to: "/players", icon: playerSvg }, */
    { name: "Weapons", to: "/weapons", icon: sword },
    /* { name: "Traits", to: "/traits", icon: trait }, */
];

const towerRoutes = [
    { name: "Tower Game", to: "/tower/status", icon: playerSvg },
    { name: "Enemies", to: "/enemies", icon: skull },
    { name: "Floors", to: "/floors", icon: floor },
];

const arenaRoutes = [{ name: "Zones", to: "/zones", icon: zone }];

const generateRouteList = (route: GamesHQRouteOption[]) => {
    return route.map((route) => (
        <ul className="pt-4">
            <Link to={route.to} className="items-center">
                <li className="flex text-gray-400 hover:text-gray-700 items-center">
                    <img className="h-5 w-5" src={route.icon} alt="icon" />
                    <span className="px-3">{route.name}</span>
                </li>
            </Link>
        </ul>
    ));
};

function App() {
    const { currentUser, isDoingInitialLoading } = useCurrentUser();
    const authenticated = !!currentUser;

    console.log({ isDoingInitialLoading, authenticated: !!currentUser });
    if (isDoingInitialLoading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <SyncLoader color={XTEAM_ACCENT_COLOR} />
            </div>
        );
    }

    if (!authenticated) {
        console.log({ isDoingInitialLoading, authenticated: !!currentUser });
        return (
            <Router>
                <Switch>
                    <Route path="/">
                        <SignInPage />
                    </Route>
                </Switch>
            </Router>
        );
    }
    return (
        <Router>
            <div className="flex h-screen bg-white">
                <nav className="w-80 font-medium text-base bg-gray-50 h-full py-4">
                    <div className="px-4 font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
                        <Link to="/">GAMESHQ</Link>
                    </div>
                    <div className="px-8 flex-col flex">
                        <span className="pt-4" />
                        <span className="uppercase py-1 text-xs text-gray-400 font-semibold">
                            INSPECT LIVE GAMES
                        </span>

                        {generateRouteList(inspectRoutes)}

                        <span className="uppercase py-1 text-xs text-gray-400 font-semibold mt-12">
                            GENERAL
                        </span>

                        {generateRouteList(databaseRoutes)}

                        <span className="uppercase py-1 text-xs text-gray-400 font-semibold mt-12">
                            THE TOWER
                        </span>

                        {generateRouteList(towerRoutes)}
                        <span className="uppercase py-1 text-xs text-gray-400 font-semibold mt-12">
                            THE ARENA
                        </span>

                        {generateRouteList(arenaRoutes)}
                    </div>
                </nav>
                <div className="w-full min-w-0 px-16 py-8">
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/login">
                            <SignInPage />
                        </Route>
                        <Route exact path="/players">
                            <PlayersPage />
                        </Route>
                        <Route exact path="/inspect/arena">
                            <InspectArenaPage />
                        </Route>

                        <Route exact path="/tower/status">
                            <TowerGamePage />
                        </Route>

                        <Route exact path="/weapons">
                            <ListWeaponsPage />
                        </Route>
                        <Route exact path="/weapons/new">
                            <WeaponEditorPage />
                        </Route>
                        <Route exact path="/weapon/:weaponId">
                            <WeaponEditorPage editMode={true} />
                        </Route>

                        <Route exact path="/zones">
                            <ListZonesPage />
                        </Route>
                        <Route exact path="/zones/new">
                            <ZoneEditorPage />
                        </Route>
                        <Route exact path="/zone/:zoneId">
                            <ZoneEditorPage editMode={true} />
                        </Route>

                        <Route exact path="/enemies">
                            <ListEnemiesPage />
                        </Route>
                        <Route exact path="/enemies/new">
                            <EnemyEditorPage />
                        </Route>
                        <Route exact path="/enemy/:enemyId">
                            <EnemyEditorPage editMode={true} />
                        </Route>

                        <Route exact path="/floors">
                            <FloorsEditorPage />
                        </Route>

                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
