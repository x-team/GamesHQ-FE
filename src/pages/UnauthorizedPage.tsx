import React from "react";
import { handleLogoutClick } from "../helpers/signInAndOutHelper";
import Button from "../ui/Button";

export const UnauthorizedPage = () => {
  const logOut = async () => {
    const loggedOut = await handleLogoutClick();
    return loggedOut;
  };
  return (
    <div className="h-screen">
      <div className="py-4 flex justify-center items-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
        UNAUTHORIZED
      </div>
      <div className="px-4 flex justify-center font-sans">
        You must be an admin to access GamesHQ's Admin Panel currently.
      </div>
      <div className="py-4 flex justify-center items-center">
        <Button onClick={() => logOut()}>Log out</Button>
      </div>
    </div>
  );
};
