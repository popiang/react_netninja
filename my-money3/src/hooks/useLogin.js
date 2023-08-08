import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

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
                throw new Error("Wrong username or password!!");
            }

            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user });

            // udpate state
            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }
        } catch (error) {
            console.log(error.message);
            if (!isCancelled) {
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
