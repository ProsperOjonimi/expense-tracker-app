import { useState } from "react";
import { Header } from "./Header";
import { Form } from "./Form";
import { TransactionList } from "./TransactionList.js";
import { Summary } from "./Summary.js";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => {
      return +t.amount + acc;
    }, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      return +t.amount + acc;
    }, 0);
  const balance = totalIncome - totalExpense;
  console.log(totalExpense);
  console.log(totalIncome);
  console.log(balance);
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
            <p id="status">No records yet 📭</p>
          )}
        </div>
      </div>
    </div>
  );
}
