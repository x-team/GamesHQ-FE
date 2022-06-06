import React from "react";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import app from "../firebase/firebase";
import Button from "../ui/Button";
import { get } from "lodash";
import { handleLogoutClick } from "../helpers/signInAndOutHelper";

const HomePage = () => {
  const navigate = useNavigate();
  const loggedUser = app.auth().currentUser;
  const displayName = get(loggedUser, "displayName");
  const logOut = async () => {
    const loggedOut = await handleLogoutClick();
    loggedOut !== null && navigate("/login");
  };

  return (
    <div>
      <div className="px-4 flex justify-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
        {!displayName ? "Welcome!" : `Welcome, ${displayName}!`}
      </div>

      <div className="flex justify-center">
        <Button onClick={logOut}>Log out</Button>
      </div>
    </div>
  );
};

export default HomePage;
