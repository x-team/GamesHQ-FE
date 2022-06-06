import { logOutFromGamesAPI } from "../api/signInAndOut";

export async function handleLogoutClick() {
  let session = localStorage.getItem("session");
  if (session) {
    const JSONSession = JSON.parse(session) as GamesAPISession;
    const gamesAPILogOut: SignInOut = await logOutFromGamesAPI(
      JSONSession.token
    );
    if (gamesAPILogOut.success) {
      localStorage.removeItem("session");
      localStorage.removeItem("currentUser");
      console.log("Success logging out");
      return true;
    } else {
      localStorage.removeItem("session");
      localStorage.removeItem("currentUser");
      console.warn("Something happened at log out");
      console.warn(gamesAPILogOut.message);
      return false;
    }
  }
}
