export function TransactionList({ transactions, setTransactions }) {
  function handleDeleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  return (
    <div className="transaction-card">
      <h2>Transactions</h2>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <div
            className={`transaction-item ${transaction.type}`}
            key={transaction.id}
          >
            <span className="transaction-desc">
              {transaction.description}
            </span>
            <span className={`transaction-type ${transaction.type}`}>
              {transaction.type}
            </span>
            <span className={`transaction-amount ${transaction.type}`}>
              &#8358;{Number(transaction.amount).toLocaleString()}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteTransaction(transaction.id)}
              title="Delete transaction"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
