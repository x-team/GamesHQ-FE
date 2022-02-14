import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import app from "../firebase/firebase";

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<
        firebase.User | undefined | null
    >(undefined);
    const [isDoingInitialLoading, setIsDoingInitialLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = app.auth().onAuthStateChanged((user) => {
            console.log("Auth state change. Current user:");
            console.log({ user });
            setCurrentUser(user);
            setIsDoingInitialLoading(false);
        });

        return unsubscribe();
    }, []);

    return { currentUser, isDoingInitialLoading };
};

export default useCurrentUser;
