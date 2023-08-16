import { useState, useEffect, useReducer } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

const initalState = {
    document: null,
    error: null,
    isPending: false,
    success: false,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return {
                document: null,
                error: null,
                isPending: true,
                success: false,
            };
        case "ADDED_DOCUMENT":
            return {
                document: action.payload,
                error: null,
                isPending: false,
                success: true,
            };
        case "ERROR":
            return {
                document: null,
                error: action.payload,
                isPending: false,
                success: false,
            };
        default:
            return state;
    }
};

export const useFirestore = (collection) => {
    const [isCancelled, setIsCancelled] = useState(false);

    const [response, dispatch] = useReducer(firestoreReducer, initalState);

    const ref = projectFirestore.collection(collection);

    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" });

        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });

            if (!addedDocument) {
                throw new Error("Failed to save document!");
            }

            if (!isCancelled) {
                dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
            }
        } catch (error) {
            if (!isCancelled) {
                dispatch({ type: "ERROR", payload: error.message });
            }
            console.log(error.message);
        }
    };

    const deleteDocument = async (id) => {};

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response };
};
