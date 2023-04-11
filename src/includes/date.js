export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getCurrentMonth(currentMonthIndex) {
  const currentMonthName = months[currentMonthIndex];
  console.log("month", currentMonthName);
}

export function getYearsInDB(transactions) {
  const years = [];
  transactions.forEach((transaction) => {
    const dateTransaction = new Date(transaction.date);
    const year = dateTransaction.getFullYear();
    years.push(year);
  });

  const yearsWithoutRepetition = [...new Set(years)];
  return yearsWithoutRepetition;
}
