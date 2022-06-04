import React, { useEffect, useState } from "react";
import { gamesHqUrl } from "../api/utils";
import { Navigate, useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import Button from "../ui/Button";
import { handleLogoutClick } from "../helpers/signInAndOutHelper";
import useCurrentUser from "../hooks/useCurrentUser";
import { UnauthorizedPage } from "./UnauthorizedPage";

const SignInPage = () => {
  let navigate = useNavigate();
  const { authenticated, isAdmin, getCurrentUser, eraseUser } =
    useCurrentUser();
  const [loggedInGoogle, setLoggedInGoogle] = useState<boolean | null>(null);
  const [renderUnauthorized, setRenderUnauthorized] = useState<boolean | null>(
    null
  );

  async function handleLoginClick(): Promise<boolean> {
    window.open(
      gamesHqUrl + "/general/login/google",
      "popup",
      "width=600,height=600,scrollbars=no,resizable=no"
    );

    const receivePostMessage = (event: MessageEvent<any>) => {
      // IMPORTANT: check the origin of the data!
      if (event.origin.startsWith(process.env.REACT_APP_GAMESHQ_API_URL!)) {
        const session = event.data;
        localStorage.setItem("session", JSON.stringify(session));
        window.removeEventListener("message", receivePostMessage);
        setLoggedInGoogle(true);
        navigate("/");
        return true;
      }
    };

    window.addEventListener("message", receivePostMessage);
    return false;
  }
  useEffect(() => {
    if (authenticated === false) {
      return setRenderUnauthorized(false);
    }
    if (authenticated && isAdmin) {
      return navigate("/");
    }

    if ((authenticated || loggedInGoogle) && !isAdmin) {
      return setRenderUnauthorized(true);
    }
  }, [authenticated, navigate, loggedInGoogle, isAdmin, getCurrentUser]);

  const logIn = async () => {
    const loggedIn = await handleLoginClick();
    loggedIn && getCurrentUser();
    // loggedIn === true;
  };

  const logOut = async () => {
    eraseUser();
    return await handleLogoutClick();
  };

  if (renderUnauthorized) {
    return (
      <>
        <div className="py-4 flex justify-center items-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
          UNAUTHORIZED
        </div>
        <div className="px-4 flex justify-center font-sans">
          You must be an admin to access GamesHQ's Admin Panel currently.
        </div>
        <span className="flex justify-center font-sans">
          <Button
            onClick={() => {
              logOut();
              setLoggedInGoogle(!loggedInGoogle);
              setRenderUnauthorized(!renderUnauthorized);
            }}
          >
            Log out
          </Button>
        </span>
      </>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="px-4 flex justify-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
        GAMES HQ - SIGN IN
      </div>
      <span className="flex justify-center font-sans">
        {!loggedInGoogle || !authenticated ? (
          <Button onClick={() => logIn()}>Login with XTU</Button>
        ) : (
          <Button onClick={() => logOut()}>Log out</Button>
        )}
      </span>
    </div>
  );
};

export default SignInPage;
