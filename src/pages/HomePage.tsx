import React from "react";
import "firebase/compat/auth";
import app from "../firebase/firebase";
import Button from "../ui/Button";
import { get } from "lodash";

const HomePage = () => {
    const loggedUser = app.auth().currentUser;
    const displayName = get(loggedUser, "displayName");

    return (
        <div>
            <div className="px-4 flex justify-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
                {!displayName ? "Welcome!" : `Welcome, ${displayName}!`}
            </div>

            <div className="flex justify-center">
                <Button
                    onClick={async () => {
                        await app.auth().signOut();
                    }}
                >
                    Log out
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
