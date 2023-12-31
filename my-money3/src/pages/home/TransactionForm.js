import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const { addDocument, response } = useFirestore("transactions");

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            uid: uid,
            name: name,
            amount: amount,
        });
    };

	useEffect(() => {
		if (response.success) {
			setName("");
			setAmount("")
		}
	}, [response.success]);

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Transaction amount:</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                {!response.isPending && <button>Add Transaction</button>}
                {response.isPending && <button disabled>Loading...</button>}
                {response.error && <p>{response.error}</p>}
            </form>
        </>
    );
}
