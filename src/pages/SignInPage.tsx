import React from "react";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import Button from "../ui/Button";
import {
  handleLoginClick,
  handleLogoutClick,
} from "../helpers/signInAndOutHelper";

const SignInPage = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("session");
  const loggedUser = currentUser ? true : false;

  const logIn = async () => {
    const loggedIn = await handleLoginClick();
    loggedIn !== null && navigate("/");
  };

  const logOut = async () => {
    const loggedOut = await handleLogoutClick();
    loggedOut !== null && navigate("/login");
  };

  return (
    <div className="flex flex-col">
      <div className="px-4 flex justify-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
        GAMES HQ - SIGN IN
      </div>
      <span className="flex justify-center font-sans" onClick={logIn}>
        <Button>Login with XTU</Button>
        {loggedUser ? <Button onClick={logOut}>Log out</Button> : null}
      </span>
    </div>
  );
};

export default SignInPage;
