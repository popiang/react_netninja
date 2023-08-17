
export default function TransactionList({transactions}) {
  return (
	<ul>
		{transactions.map(transaction => (
			<li key={transaction.id}></li>
		))}
	</ul>
  )
}
