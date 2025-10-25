export function Summary({ totalIncome, totalExpense, balance }) {
  return (
    <div className="summary">
      <h2>Summary 📊</h2>

      <div className="totals">
        <p>
          Total Income: <span id="total-income">₦{totalIncome}</span>
        </p>
        <p>
          Total Expenses: <span id="total-expense">₦{totalExpense}</span>
        </p>
        <p>
          Balance: <span id="balance">₦{balance}</span>
        </p>
      </div>

      <p className="summary-text">
        {balance < 0 ? "⚠️ You’re in debt!" : "You’re doing great! 💸"}
      </p>
    </div>
  );
}
