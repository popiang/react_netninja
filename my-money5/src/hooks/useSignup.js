import { useState } from "react";
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            );

            if (!res) {
                throw new Error("Failed to create user!");
            }

            res.user.updateProfile({ displayName: displayName });

            setError(null);
            setIsPending(false);
        } catch (error) {
            setError(error.message);
            setIsPending(false);
        }
    };

    return { signup, error, isPending };
};
