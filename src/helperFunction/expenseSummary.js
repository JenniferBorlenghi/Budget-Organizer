import { expenseTypes } from "../includes/categories";

export default function ExpenseSummary(transactions) {
  let expenseSummary = 0;
  transactions.forEach((transaction) => {
    if (expenseTypes.includes(transaction.category)) {
      expenseSummary += parseFloat(transaction.amount);
    }
  });

  return expenseSummary;
}
