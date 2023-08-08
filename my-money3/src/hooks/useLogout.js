import { projectAuth } from "../firebase/config";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
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
			if (!isCancelled) {
				setError(null);
				setIsPending(false);
			}
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

    return { logout, error, isPending };
};
