import { CADFormat } from "./../../../includes/currencyFormat";
import "./styles.scss";
import { incomeTypes } from "../../../includes/categories";

export default function ProgressBarLayout({
  category,
  expense,
  settingExpense,
}) {
  let progress = (expense * 100) / settingExpense;

  if (progress > 100) {
    progress = 100;
  }

  let progressBarFillClass;

  if (progress < 50 && !incomeTypes.includes(category)) {
    progressBarFillClass = "green-fill";
  } else if (progress < 50 && incomeTypes.includes(category)) {
    progressBarFillClass = "red-fill";
  } else if (progress >= 50 && progress < 80) {
    progressBarFillClass = "yellow-fill";
  } else if (progress >= 80 && !incomeTypes.includes(category)) {
    progressBarFillClass = "red-fill";
  } else if (progress >= 80 && incomeTypes.includes(category)) {
    progressBarFillClass = "green-fill";
  }

  let infoClass =
    category === "Summary" ? "category-info-summary" : "category-info";

  return (
    <div className="progress-bar-comp">
      <div className={infoClass}>
        <div className="category-title">{category}:</div>

        <div className="category-amount">
          <div className="expense">{CADFormat.format(expense)} / </div>
          <div className="settings-expense">
            {" "}
            {CADFormat.format(settingExpense)}
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className={progressBarFillClass}
            style={{ width: `${progress}%`, height: "10px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
