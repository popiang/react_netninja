import { projectFirestore } from "../firebase/config";
import { useState, useEffect } from "react";

export const useCollection = (collection) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        const unsub = ref.onSnapshot(
            (snapshot) => {
                const results = [];
                snapshot.docs.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id });
                });

                setDocuments(results);
            },
            (error) => {
                setError(error.message);
                console.log(error.message);
            }
        );

        unsub();
    }, [collection]);

    return { documents, error };
};
