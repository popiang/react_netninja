import { projectAuth } from "../firebase/config";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(null);

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.signInWithEmailAndPassword(
                email,
                password
            );

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

	useState(() => {
		return () => setIsCancelled(true);
	}, []);

    return { signup, error, isPending };
};
