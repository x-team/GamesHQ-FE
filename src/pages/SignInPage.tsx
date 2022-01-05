import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { SyncLoader } from "react-spinners";
import app from "../firebase/firebase";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const SignInPage = () => {
    if (!firebase) {
        return <SyncLoader />;
    }

    const loggedUser = app.auth().currentUser;

    return (
        <div>
            <div className="px-4 flex justify-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
                GAMES HQ - SIGN IN
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />

            {loggedUser ? (
                <button
                    type="button"
                    onClick={async () => {
                        await app.auth().signOut();
                    }}
                >
                    Log out
                </button>
            ) : null}
        </div>
    );
};

export default SignInPage;
