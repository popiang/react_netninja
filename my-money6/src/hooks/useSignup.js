import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            );

            if (!res) {
                throw new Error("Failed to create user");
            }

            res.user.updateProfile({ displayName: displayName });

            dispatch({ type: "LOGIN", payload: res.user });

            setError(null);
            setIsPending(false);
        } catch (error) {
            setError(error.message);
            setIsPending(false);
            console.log(error.message);
        }
    };

    return { signup, error, isPending };
};
