import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
    const [error, setError] = useState(null);
    const [documents, setDocuments] = useState(null);
	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

    useEffect(() => {
		setError(null);
		
		let ref = projectFirestore.collection(collection);

		if (query) {
			ref = ref.where(...query);
		}

		if (orderBy) {
			ref = ref.orderBy(...orderBy);
		}

        const unsub = ref.onSnapshot(
            (snapshot) => {
                const results = [];
                snapshot.docs.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id });
                });
                setDocuments(results);
                setError(null);
            },
            (error) => {
                setError(error.message);
                console.log(error.message);
            }
        );
        return () => unsub();
    }, [collection, query, orderBy]);

    return { documents, error };
};
