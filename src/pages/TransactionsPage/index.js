import PageContainer from "./../../components/PageContainer";
import Table from "../../components/Table";
import { IoIosAdd } from "react-icons/io";
import "./styles.scss";
import { useSelector } from "react-redux";
import { CADFormat } from "../../includes/currencyFormat";

export default function TransactionsPage() {
  const transactions = useSelector((state) => state.transaction.transactions);
  let summary = 0;
  transactions.forEach((transaction) => {
    if (
      transaction.category === "Income" ||
      transaction.category === "Leasing" ||
      transaction.category === "Investments"
    ) {
      summary += parseFloat(transaction.amount);
    } else {
      summary -= parseFloat(transaction.amount);
    }
  });

  const summaryClass = summary >= 0 ? "positive-sum" : "negative-sum";
  return (
    <PageContainer title="Transactions" className="transactions-page">
      <Table currentTransaction={false} />

      <h3>
        Summary:{" "}
        <span className={summaryClass}>{CADFormat.format(summary)}</span>
      </h3>

      <button className="add-button">
        <IoIosAdd />
        Add
      </button>
    </PageContainer>
  );
}
