import { projectFirestore, timestamp } from "../firebase/config";
import { useState, useReducer, useEffect } from "react";

const initialState = {
    document: null,
    error: null,
    isPending: false,
    success: false,
};

const firestoreReducer = (response, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return {
                document: null,
                error: null,
                isPending: true,
                success: false,
            };
        case "DOCUMENT_ADDED":
            return {
                document: action.payload,
                error: null,
                isPending: false,
                success: true,
            };
        case "DOCUMENT_DELETED":
            return {
                document: null,
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
            return response;
    }
};

export const useFirestore = (collection) => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const ref = projectFirestore.collection(collection);

    const addDocument = async (doc) => {
        try {
            dispatch({ type: "IS_PENDING" });

            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });

            if (!addedDocument) {
                throw new Error("Document failed to be saved!");
            }

            if (!isCancelled) {
                dispatch({ type: "DOCUMENT_ADDED", payload: addedDocument });
            }
        } catch (error) {
            if (!isCancelled) {
                dispatch({ type: "ERROR", payload: error.message });
            }
            console.log(error.message);
        }
    };

    const deleteDocument = async (id) => {
        try {
            dispatch({ type: "IS_PENDING" });

            await ref.doc(id).delete();

            if (!isCancelled) {
                dispatch({ type: "DOCUMENT_DELETED" });
            }
        } catch (error) {
            if (!isCancelled) {
                dispatch({ type: "ERROR", payload: error.message });
            }
            console.log(error.message);
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response };
};
