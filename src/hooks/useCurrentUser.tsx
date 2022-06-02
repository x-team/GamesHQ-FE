import { useEffect, useState } from "react";
import { checkSession } from "../api/signInAndOut";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<
    GamesAPIUSer | undefined | null
  >(undefined);
  const [isDoingInitialLoading, setIsDoingInitialLoading] = useState(true);
  let session = localStorage.getItem("session");

  if (!session || session === "undefined") {
    session = JSON.stringify({
      token: "no-token",
    });
  }

  const JSONSession = JSON.parse(session) as GamesAPISession;
  useEffect(() => {
    console.log("** Auth state change. Current user: **");
    console.log({ currentUser });
    if ((!isDoingInitialLoading && !!currentUser) || !session) {
      return;
    }
    const fetchSession = async () => {
      const apiSession: SignIn = await checkSession(JSONSession?.token);
      const headerNeeded = "xtu-session-token Header needed";

      if (!apiSession.success && apiSession.message === headerNeeded) {
        setIsDoingInitialLoading(false);
      }

      if (apiSession.success) {
        setCurrentUser(apiSession.user);
        localStorage.setItem("session", JSON.stringify(apiSession.session));
      }
      setIsDoingInitialLoading(false);
    };
    fetchSession().catch(console.error);
  }, [JSONSession, currentUser, isDoingInitialLoading, session]);

  return {
    currentUser,
    authenticated: !!currentUser,
    isAdmin: currentUser?.isAdmin,
    isDoingInitialLoading,
  };
};

export default useCurrentUser;
