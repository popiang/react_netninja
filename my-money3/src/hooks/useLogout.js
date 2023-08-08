import { projectAuth } from "../firebase/config";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            await projectAuth.signOut();

            // dispatch logout action
            dispatch({ type: "LOGOUT" });

            // update state
            setError(null);
            setIsPending(false);
        } catch (error) {
            setError(error.message);
            setIsPending(false);
            console.log(error.message);
        }
    };

    return { logout, error, isPending };
};
