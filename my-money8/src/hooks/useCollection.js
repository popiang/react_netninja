import { projectFirestore } from "../firebase/config";
import {useState, useEffect} from "react";

export const useCollection = (collection) => {
	const [error, setError] = useState(null);
	const [documents, setDocuments] = useState(null);

	useEffect(() => {
		setError(null);

		let ref = projectFirestore.collection(collection);

		ref.onSnapshot(snapshot => {
			let results = [];
			snapshot.docs.forEach(doc => {
				results.push(doc);
			});
			setDocuments(results);
		})

	}, []);

	return {documents, error}
}