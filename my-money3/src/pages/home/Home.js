// components
import TransactionForm from "./TransactionForm";

// styles
import styles from "./Home.module.css";

export default function home() {
  return (
	<div className={styles.container}>
		<div className={styles.content}>
			transaction list
		</div>
		<div className={styles.sidebar}>
			<TransactionForm />
		</div>
	</div>
  )
}
