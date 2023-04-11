import { incomeTypes } from "../includes/categories";

export default function Summary(transactions) {
  let summary = 0;
  transactions.forEach((transaction) => {
    if (incomeTypes.includes(transaction.category)) {
      summary += parseFloat(transaction.amount);
    } else {
      summary -= parseFloat(transaction.amount);
    }
  });

  return summary;
}
