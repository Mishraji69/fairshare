const ExpenseList = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-400">No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Expenses</h2>
      
      {expenses.map((expense) => (
        <div key={expense.id} className="card">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                {expense.description}
              </h3>
              <p className="text-gray-400 text-sm">
                Paid by {expense.paid_by_name || `User #${expense.paid_by}`}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(expense.created_at).toLocaleDateString()} at{' '}
                {new Date(expense.created_at).toLocaleTimeString()}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-500">
                ${parseFloat(expense.amount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
