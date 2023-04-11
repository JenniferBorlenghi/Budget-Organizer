export default function SummaryByCategory(transactions, category) {
  let summaryPerCategory = 0;
  transactions.forEach((transaction) => {
    if (transaction.category === category) {
      summaryPerCategory += parseFloat(transaction.amount);
    }
  });

  return summaryPerCategory;
}
