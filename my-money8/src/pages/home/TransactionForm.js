import { useState } from "react";

export default function TransactionForm() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		console.log({
			name,
			amount
		});
	}

    return (
        <>
            <h3>Add Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name</span>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </label>
                <label>
                    <span>Transaction amount</span>
                    <input
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        required
                    />
                </label>
                <button className="btn">Add Transaction</button>
            </form>
        </>
    );
}
