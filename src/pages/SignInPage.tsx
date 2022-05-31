import React from "react";
import "firebase/compat/auth";
import Button from "../ui/Button";
import { handleLoginClick, handleLogoutClick } from "../helpers/signInAndOutHelper";

const SignInPage = () => {
    const currentUser = localStorage.getItem('session');
    const loggedUser = (currentUser) ? true : false; 

    return (
        <div className="flex flex-col">
            <div className="px-4 flex justify-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
                GAMES HQ - SIGN IN
            </div>
            <span className="flex justify-center font-sans" onClick={handleLoginClick}>
              <Button>Login with XTU</Button>
              {loggedUser ? (
                <Button onClick={handleLogoutClick}>
                    Log out
                </Button>
              ) : null}
            </span>
        </div>
    );
};

export default SignInPage;
