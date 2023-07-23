import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

// styles
import "./Recipe.css";

export default function Recipe() {
    const { id } = useParams();
    const { mode } = useTheme();

    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        setIsPending(true);

        const unsub = projectFirestore
            .collection("recipes")
            .doc(id)
            .onSnapshot((doc) => {
                console.log(doc);
                if (doc.exists) {
                    setIsPending(false);
                    setRecipe(doc.data());
                } else {
                    setIsPending(false);
                    setError("Could not find that recepi!");
                }
            }, (err) => {
				setError(err.message);
				setIsPending(false);
			});

		return () => unsub();

    }, [id]);

    // useEffect(() => {
    //     setIsPending(true);

    //     projectFirestore
    //         .collection("recipes")
    //         .doc(id)
    //         .get()
    //         .then((doc) => {
	// 			console.log(doc);
    //             if (doc.exists) {
    //                 setIsPending(false);
    //                 setRecipe(doc.data());
    //             } else {
    //                 setIsPending(false);
    //                 setError("Could not find that recepi!");
    //             }
    //         });
    // }, [id]);

	const handleClick = () => {
		projectFirestore.collection('recipes').doc(id).update({
			title: 'Something completely different'
		});
	};

    return (
        <div className={`recipe ${mode}`}>
            {isPending && <p className="loading">Loading</p>}
            {error && <p className="error">{error}</p>}
            {recipe && (
                <>
                    <h2 className="page-title">{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook</p>
                    <ul>
                        {recipe.ingredients.map((ing) => (
                            <li key={ing}>{ing}</li>
                        ))}
                    </ul>
                    <p className="method">{recipe.method}</p>
					<button onClick={handleClick}>Update me</button>
                </>
            )}
        </div>
    );
}
