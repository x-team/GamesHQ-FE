import React from "react";
import { useNavigate } from "react-router-dom";
import { gamesHqUrl } from "../api/utils";
import { logOutFromGamesAPI } from "../api/signInAndOut";

export async function handleLoginClick() {
  // const userSession = await checkSession();
  window.open(
    gamesHqUrl + "/general/login/google",
    "popup",
    "width=600,height=600,scrollbars=no,resizable=no"
  );

  const receivePostMessage = (event: MessageEvent<any>) => {
    // IMPORTANT: check the origin of the data!
    if (event.origin.startsWith(process.env.REACT_APP_GAMESHQ_API_URL!)) {
      console.log(event.data);
      const session = event.data;
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      // The data was NOT sent from your site!
      // Be careful! Do not use it. This else branch is
      // here just for clarity, you usually shouldn't need it.
      return;
    }
    window.removeEventListener("message", receivePostMessage);
  };

  window.addEventListener("message", receivePostMessage);
  return true;
}

export async function handleLogoutClick() {
  let session = localStorage.getItem("session");
  if (!session) {
    session = JSON.stringify({
      token: "no-token",
    });
    return false;
  }
  console.log("logging out1");
  const JSONSession = JSON.parse(session) as GamesAPISession;
  console.log("logging out2");
  const gamesAPILogOut: SignInOut = await logOutFromGamesAPI(JSONSession.token);
  console.log("logging out3");
  console.log({ gamesAPILogOut });
  if (gamesAPILogOut.success) {
    localStorage.removeItem("session");
    return true;
  } else {
    console.warn("Something happened at log out");
    console.warn(gamesAPILogOut.message);
    return false;
  }
}
