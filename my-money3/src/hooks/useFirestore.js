import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: false,
};

export const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return {
                document: null,
                isPending: true,
                error: null,
                success: false,
            };
        case "ADDED_DOCUMENT":
            return {
                document: action.payload,
                isPending: false,
                error: null,
                success: true,
            };
        case "ERROR":
            return {
                document: null,
                isPending: false,
                error: action.payload,
                success: false,
            };
        default:
            return state;
    }
};

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref
    const ref = projectFirestore.collection(collection);

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" });

        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });

            if (!addedDocument) {
                throw new Error("Failed to save document!!");
            }

            if (!isCancelled) {
                dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
            }
        } catch (error) {
            if (!isCancelled) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        }
    };

    // delete a document
    const deleteDocument = async (id) => {};

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response };
};
