export function TransactionList({ transactions, setTransactions }) {
  function handleDeleteTransaction(e) {
    const id = e.target.dataset.id;
    console.log(id);
    setTransactions(transactions.filter((t) => t.id !== id));
  }
  return (
    <div className="transaction-container">
      <h2>Transactions 📋</h2>
      {transactions.map((transaction) => (
        <div className="transaction" key={transaction.description}>
          <p>{transaction.description}</p>
          <p>{transaction.type}</p>
          <p>{transaction.amount}</p>
          <button
            className="delete-transaction"
            data-id={transaction.id}
            onClick={handleDeleteTransaction}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
