import PageContainer from "./../../components/PageContainer";
import Table from "../../components/Table";
import { IoIosAdd } from "react-icons/io";
import "./styles.scss";
import { useSelector } from "react-redux";
import { CADFormat } from "../../includes/currencyFormat";
import { useNavigate } from "react-router-dom";
import Summary from "./../../helperFunction/summary";

export default function TransactionsPage() {
  const transactions = useSelector((state) => state.transaction.transactions);
  const navigate = useNavigate();

  const summary = Summary(transactions);

  const handleClickAddButton = () => {
    navigate("/add");
  };

  const summaryClass = summary >= 0 ? "positive-sum" : "negative-sum";
  return (
    <PageContainer title="Transactions" className="transactions-page">
      <Table currentTransaction={false} />

      <h3>
        Summary:{" "}
        <span className={summaryClass}>{CADFormat.format(summary)}</span>
      </h3>

      <button className="add-button" onClick={handleClickAddButton}>
        <IoIosAdd />
        Add
      </button>
    </PageContainer>
  );
}
