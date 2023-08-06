import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = (email, password) => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            // login
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            if (!res) {
                throw new Error("User does not exist!!");
            }

            // dispatch login
            dispatch({ type: "LOGIN", payload: res.user });

            // update state
            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }
        } catch (error) {
            if (!isCancelled) {
                console.log(error.message);
                setError(error.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { login, error, isPending };
};
