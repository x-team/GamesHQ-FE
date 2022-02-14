import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import app from "../firebase/firebase";
import { firestoreConverter } from "../utils/firestoreUtils";

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<
        firebase.User | undefined | null
    >(undefined);
    const [userFirestoreData, setUserFirestoreData] =
        useState<IUserFirestoreData>();
    const [isDoingInitialLoading, setIsDoingInitialLoading] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged(async (user) => {
            console.log("** Auth state change. Current user: **");
            console.log({ user });
            if (user) {
                const firestoreDoc = await app
                    .firestore()
                    .collection("users")
                    .withConverter(firestoreConverter<IUserFirestoreData>())
                    .doc(user?.uid)
                    .get();
                setCurrentUser(user);
                setUserFirestoreData(firestoreDoc.data());
            }

            setIsDoingInitialLoading(false);
        });
    }, []);

    return {
        currentUser,
        userFirestoreData,
        authenticated: !!currentUser && !!userFirestoreData,
        isAdmin: userFirestoreData && userFirestoreData.role === "admin",
        isDoingInitialLoading,
    };
};

export default useCurrentUser;
