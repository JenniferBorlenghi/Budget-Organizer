import { useSelector } from "react-redux";
import SummaryPerCategory from "./../../helperFunction/summaryByCategory";
import ExpenseSummary from "./../../helperFunction/expenseSummary";
import IncomeSummary from "../../helperFunction/incomeSummary";
import { categoryOptions } from "../../includes/categories";
import ProgressBarLayout from "./ProgressBarLayout";
import "./styles.scss";

export default function ProgressBars({ transactions }) {
  const settings = useSelector((state) => state.settings.settings);

  return (
    <div className="progress-bars-comp">
      <div className="summary-progress-bar">
        <ProgressBarLayout
          category="Summary"
          expense={ExpenseSummary(transactions)}
          settingExpense={IncomeSummary(transactions)}
        />
      </div>
      {categoryOptions.map((cat) => (
        <ProgressBarLayout
          key={cat}
          category={cat}
          expense={SummaryPerCategory(transactions, cat)}
          settingExpense={settings[cat]}
        />
      ))}
    </div>
  );
}
