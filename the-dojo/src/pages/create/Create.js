import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import Select from "react-select";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";

// styles
import "./Create.css";
import { useEffect } from "react";

const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
];

export default function Create() {
	const { user } = useAuthContext(); 
    const { documents } = useCollection("users");
    const [users, setUsers] = useState([]);
	const { addDocument, response } = useFirestore("projects");
	const history = useHistory();

    // form fields
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("");
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        if (documents) {
            const options = documents.map((user) => {
                return { value: user, label: user.displayName };
            });
            setUsers(options);
        }
    }, [documents]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

		// error checking
        if (!category) {
            setFormError("Please select a project category");
            return;
        }

        if (assignedUsers.length < 1) {
            setFormError("Please assign the project to at least 1 user");
            return;
        }

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid
		}

		const assignedUsersList = assignedUsers.map(user => {
			return {
				displayName: user.value.displayName,
				photoURL: user.value.photoURL,
				id: user.value.id
			}
		});

		const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        };

		await addDocument(project);
		if (!response.error) {
			history.push("/");
		}
    };

    return (
        <div className="create-form" onSubmit={handleSubmit}>
            <h2 className="page-title">Create a new project</h2>
            <form>
                <label>
                    <span>Project Name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Set Due Date:</span>
                    <input
                        type="date"
                        required
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project Category</span>
                    <Select
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assign To:</span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
				{response.isPending && <button className="btn">Loading...</button>}
                {!response.isPending && <button className="btn">Add Project</button>}
				{formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}
