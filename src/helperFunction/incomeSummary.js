import { incomeTypes } from "../includes/categories";

export default function IncomeSummary(transactions) {
  let incomeSummary = 0;
  transactions.forEach((transaction) => {
    if (incomeTypes.includes(transaction.category)) {
      incomeSummary += parseFloat(transaction.amount);
    }
  });

  return incomeSummary;
}
