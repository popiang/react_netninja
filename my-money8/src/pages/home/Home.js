import { useAuthContext } from "../../hooks/useAuthContext";

// components & pages
import TransactionForm from "./TransactionForm";

// styles
import styles from "./Home.module.css";

export default function Home() {
    const { user } = useAuthContext();

    return (
        <div className={styles.container}>
            <div className={styles.content}>Transaction List</div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    );
}
