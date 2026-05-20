export function Summary({ totalIncome, totalExpense, balance }) {
  const isNegative = balance < 0;

  return (
    <div className="summary-card">
      <h2>Summary</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <div className="label">Total Income</div>
          <div className="value income">
            &#8358;{totalIncome.toLocaleString()}
          </div>
        </div>
        <div className="summary-item">
          <div className="label">Total Expenses</div>
          <div className="value expense">
            &#8358;{totalExpense.toLocaleString()}
          </div>
        </div>
        <div className="summary-item full">
          <div className="label">Balance</div>
          <div className={`value balance${isNegative ? " negative" : ""}`}>
            &#8358;{balance.toLocaleString()}
          </div>
        </div>
      </div>
      <div className={`status-banner ${isNegative ? "negative" : "positive"}`}>
        {isNegative ? "You are in debt" : "You are doing great"}
      </div>
    </div>
  );
}
