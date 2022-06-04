import { useEffect, useState, useCallback } from "react";
import { checkSession } from "../api/signInAndOut";

const useCurrentUser = () => {
  let storedSession = localStorage.getItem("session");
  let storedCurrentUser = localStorage.getItem("currentUser");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<
    GamesAPIUSer | undefined | null
  >(storedCurrentUser && JSON.parse(storedCurrentUser));
  const [currentSession, setCurrentSession] = useState<
    GamesAPISession | undefined | null
  >(storedSession && JSON.parse(storedSession));
  const [isDoingInitialLoading, setIsDoingInitialLoading] = useState(true);

  const getCurrentUser = useCallback(() => {
    if (currentUser && currentSession) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    if ((!isDoingInitialLoading && !!currentUser) || !storedSession) {
      return;
    }
    const JSONSession = JSON.parse(storedSession) as GamesAPISession;
    const fetchSession = async () => {
      const apiSession: SignIn = await checkSession(JSONSession?.token);
      const headerNeeded = "xtu-session-token Header needed";

      if (!apiSession.success && apiSession.message === headerNeeded) {
        setIsDoingInitialLoading(false);
      }

      if (apiSession.success) {
        setCurrentUser(apiSession.user);
        localStorage.setItem("currentUser", JSON.stringify(apiSession.user));
        setCurrentSession(apiSession.session);
        localStorage.setItem("session", JSON.stringify(apiSession.session));
        setIsLoading(false);
      }
      setIsLoading(false);
      setIsDoingInitialLoading(false);
    };
    fetchSession().catch(console.error);
  }, [currentUser, isDoingInitialLoading, storedCurrentUser, storedSession]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const eraseUser = () => {
    setCurrentUser(null);
    setCurrentSession(null);
    setIsDoingInitialLoading(true);
    localStorage.removeItem("session");
    localStorage.removeItem("currentUser");
    setIsLoading(true);
  };

  return {
    getCurrentUser,
    isLoading,
    eraseUser,
    currentUser,
    authenticated: !!currentUser,
    isAdmin: currentUser?.isAdmin,
    isDoingInitialLoading,
  };
};

export default useCurrentUser;
