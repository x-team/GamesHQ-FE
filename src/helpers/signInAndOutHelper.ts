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
}

export async function handleLogoutClick() {
  let session = localStorage.getItem("session");
  if (!session) {
    session = JSON.stringify({
      token: "no-token",
    });
    return;
  }
  const JSONSession = JSON.parse(session) as GamesAPISession;
  const gamesAPILogOut: SignInOut = await logOutFromGamesAPI(JSONSession.token);

  if (gamesAPILogOut.success) {
    localStorage.removeItem("session");
  } else {
    console.warn("Something happened at log out");
    console.warn(gamesAPILogOut.message);
  }
}
