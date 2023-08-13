import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        try {
            setError(null);
            setIsPending(true);

            const res = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            );

            if (!res) {
                throw new Error("Failed to create user!");
            }

            res.user.updateProfile({ displayName: displayName });

            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
                setError(null);
                setIsPending(false);
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

    return { signup, error, isPending };
};
