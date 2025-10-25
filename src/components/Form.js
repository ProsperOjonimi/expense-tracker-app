import { useState } from "react";

export function Form({ setTransactions }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  function handleAddTransaction(e) {
    e.preventDefault();
    if (!description || !amount) return alert("Kindly fill this in ✍️");
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
    <form className="form">
      <div>
        <label>Transaction Description 💬</label>
        <input
          type="text"
          placeholder="Rent, Salary 💰"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Amount 💵</label>
        <input
          type="number"
          placeholder="₦2500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Type 📂</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income 💰</option>
          <option value="expense">Expense 💸</option>
        </select>
      </div>

      <button className="btn-add" onClick={handleAddTransaction}>
        Add Transaction ➕
      </button>
    </form>
  );
}
