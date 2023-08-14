import { projectAuth } from "../firebase/config";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);

        try {
            await projectAuth.signOut();

            if (!isCancelled) {
                dispatch({ type: "LOGOUT" });
                setError(null);
            }
        } catch (error) {
            if (!isCancelled) {
                setError(error.message);
                console.log(error.message);
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { logout, error };
};
