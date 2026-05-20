import { useState } from "react";

export function Form({ setTransactions }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  function handleAddTransaction(e) {
    e.preventDefault();
    if (!description || !amount) return;
    const transaction = {
      id: crypto.randomUUID(),
      description,
      amount,
      type,
    };

    setTransactions((t) => [...t, transaction]);
    setDescription("");
    setAmount("");
    setType("income");
  }

  return (
    <div className="form-card">
      <h2>New Transaction</h2>
      <form className="form" onSubmit={handleAddTransaction}>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            placeholder="e.g. Rent, Salary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button className="btn-add" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}
