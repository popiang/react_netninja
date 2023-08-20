import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthcontext";
import { useEffect, useState } from "react";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState("");
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);

        try {
            await projectAuth.signOut();
            dispatch({ type: "LOGOUT" });

            if (!isCancelled) {
                setError(null);
            }
        } catch (error) {
            if (!isCancelled) {
                setError(error.message);
            }
            console.log(error.message);
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { logout, error };
};
