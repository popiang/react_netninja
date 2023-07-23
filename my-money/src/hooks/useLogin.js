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

         // sign the user in
         try {
             const res = await projectAuth.signInWithEmailAndPassword(
                 email,
                 password
             );

             // dispatch login action
             dispatch({ type: "LOGIN", payload: res.user });

             // update state
             if (!isCancelled) {
                 setIsPending(false);
                 setError(null);
             }
         } catch (error) {
             if (!isCancelled) {
                 console.log(error.message);
                 setError(error.message);
                 setIsPending(false);
             }
         }
     };

	 // clean up function
     useEffect(() => {
         return () => setIsCancelled;
     }, []);

     return { login, error, isPending };
 };
