import React from "react";
import app from "../firebase/firebase";
import Button from "../ui/Button";

const UnauthorizedPage = () => {
    return (
        <div className="h-screen">
            <div className="py-4 flex justify-center items-center font-sans italic text-2xl text-xteamaccent font-extrabold mb-8">
                UNAUTHORIZED
            </div>
            <div className="px-4 flex justify-center font-sans">
                You must be an admin to access GamesHQ's Admin Panel currently.
            </div>
            <div className="py-4 flex justify-center items-center">
                <Button
                    onClick={async () => {
                        await app.auth().signOut();
                        window.location.reload();
                    }}
                >
                    Log Out
                </Button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
