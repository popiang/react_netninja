import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.signInWithEmailAndPassword(
                email,
                password
            );

            if (!res) {
                throw new Error("Failed to login!!");
            }

            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }

            dispatch({ type: "LOGIN", payload: res.user });
        } catch (error) {
            if (!isCancelled) {
                setError(error.message);
                setIsPending(false);
            }
            console.log(error.message);
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { login, error, isPending };
};
