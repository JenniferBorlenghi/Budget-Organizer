import PageContainer from "./../../components/PageContainer";
import Table from "../../components/Table";
import { IoIosAdd } from "react-icons/io";
import "./styles.scss";

import { useSelector } from "react-redux";

export default function TransactionsPage() {
  const transactions = useSelector((state) => state.transaction.transactions);
  let summary = 0;
  transactions.forEach((transaction) => {
    summary += transaction.amount;
  });

  const summaryClass = summary >= 0 ? "positive-sum" : "negative-sum";
  return (
    <PageContainer title="Transactions" className="transactions-page">
      <Table isEditing={false} />

      <h3>
        Summary: <span className={summaryClass}>${summary}</span>
      </h3>

      <button className="add-button">
        <IoIosAdd />
        Add
      </button>
    </PageContainer>
  );
}
