"use client";

import { signOut } from "../login/actions";

const SignOutButton = () => {

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOutButton;