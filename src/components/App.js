import { useState } from "react";
import { Header } from "./Header";
import { Form } from "./Form";
import { TransactionList } from "./TransactionList";
import { Summary } from "./Summary";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => +t.amount + acc, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => +t.amount + acc, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="container">
      <Header />
      <div className="main">
        <Form setTransactions={setTransactions} />
        <div className="records">
          {transactions.length > 0 ? (
            <>
              <TransactionList
                transactions={transactions}
                setTransactions={setTransactions}
              />
              <Summary
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                balance={balance}
              />
            </>
          ) : (
            <div className="transaction-card">
              <div className="empty-state">
                <p>No transactions yet. Add one to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
