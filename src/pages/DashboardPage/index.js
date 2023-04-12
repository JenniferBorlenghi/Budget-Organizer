import PageContainer from "./../../components/PageContainer";
import ProgressBars from "../../components/ProgressBars";
import { useState } from "react";
import { months, getCurrentMonth, getYearsInDB } from "../../includes/date";
import { useSelector } from "react-redux";
import "./styles.scss";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";

export default function DashboardPage() {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentMonth = getCurrentMonth(currentMonthIndex);
  const currentYear = currentDate.getFullYear();

  const transactions = useSelector((state) => state.transaction.transactions);
  const yearsWithTransactions = getYearsInDB(transactions);

  const filterYearAndMonth = (yearToFilter, monthToFilter) => {
    const filterByYear = transactions.filter(
      (transaction) => new Date(transaction.date).getFullYear() === yearToFilter
    );

    const filterByMonth = filterByYear.filter(
      (transaction) =>
        months[new Date(transaction.date).getMonth()] === monthToFilter
    );

    return filterByMonth;
  };

  const currentTransactions = filterYearAndMonth(currentYear, currentMonth);

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const [transactionsToShow, setTransactionsToShow] =
    useState(currentTransactions);

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    setTransactionsToShow(filterYearAndMonth(year, month));
  };

  return (
    <PageContainer title="Dashboard" className="dashboard-page">
      <form onSubmit={handleFilterSubmit}>
        <div className="month-filter">
          <label>
            Month:
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {months.map((m) => (
                <option value={m} key={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="year-filter">
          <label>
            Year:
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {yearsWithTransactions.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button>
          <AiOutlineSearch />
          Search
        </button>
      </form>
      {transactionsToShow.length === 0 && (
        <div className="no-transactions">
          <p>No transactions found!</p>
          <GrTransaction />
        </div>
      )}
      {transactionsToShow.length > 0 && (
        <ProgressBars transactions={transactionsToShow} />
      )}
    </PageContainer>
  );
}
