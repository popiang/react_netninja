import { useState, useEffect, useRef } from "react";

export const useFetch = (url, _options) => {

	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	// use useRef to wrap an object/array argument
	// which is a useEffect dependency
	const options = useRef(_options).current;

	useEffect(() => {
		console.log(options);
		const controller = new AbortController();

		const fetchData = async () => {
			setIsPending(true);

			try {
				const res = await fetch(url, { signal: controller.signal }); // send AbortController into the fetch, so the AbortController knows which fetch to abort
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				const json = await res.json();

				setIsPending(false);
				setData(json);
				setError(null);
			} catch (err) {
				if (err.name === "AbortError") {
					console.log("the fetch was aborted");
				} else {
					setIsPending(false);
					setError('Could not fetch the data');
				}
			}
		}
		fetchData();

		// will run when a component using this useEffect hook unmounted
		return () => {
			// this method will find any fetch request associated with the AbortController and immediately stop it
			// then the fetch request will throw a specific type of error called Aborter the with the error name AbortError
			controller.abort();
		};

	}, [url, options]);

	return { data, isPending, error }
}