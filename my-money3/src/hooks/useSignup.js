import { projectAuth } from "../firebase/config";
import { useState } from "react";
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

            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user });

            if (!res) {
                throw new Error("Could not complete signup!!");
            }

            await res.user.updateProfile({ displayName: displayName });

            setIsPending(false);
            setError(null);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }
    };

    return { signup, error, isPending };
};
