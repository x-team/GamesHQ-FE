import React from "react";
import { Link, Route } from "react-router-dom";

import playerSvg from "../assets/icons/player.svg";
import skull from "../assets/icons/skull.svg";
import sword from "../assets/icons/sword.svg";
import floor from "../assets/icons/floor.svg";
import zone from "../assets/icons/zone.svg";
import games from "../assets/icons/games.svg";
import SignInPage from "../pages/SignInPage";
import useCurrentUser from "../hooks/useCurrentUser";

interface IProps {
  path: string;
  children: React.ReactNode;
}

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

const gameDevRoutes = [{ name: "Game Dev", to: "/games", icon: games }];

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

const GamesHQRoute: React.FC<IProps> = ({ children, path }) => {
  const { currentUser } = useCurrentUser();
  const authenticated = !!currentUser;

  if (!authenticated) {
    return <SignInPage />;
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="w-full min-w-0 px-16 py-8">
        <nav className="w-80 font-medium text-base bg-gray-50 h-full py-4">
          <div className="px-4 font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
            GAMESHQ
          </div>
          <div className="px-8 flex-col flex">
            <span className="pt-4" />
            <span className="uppercase py-1 text-xs text-gray-400 font-semibold">
              MY GAMES
            </span>

            {generateRouteList(gameDevRoutes)}

            <span className="uppercase py-1 text-xs text-gray-400 font-semibold  mt-12">
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
        <Route path={path}>{children}</Route>
      </div>
    </div>
  );
};

export default GamesHQRoute;
