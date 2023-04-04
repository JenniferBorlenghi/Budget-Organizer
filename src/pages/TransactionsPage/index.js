import PageContainer from "./../../components/PageContainer";
import Table from "../../components/Table";
import { IoIosAdd } from "react-icons/io";
import "./styles.scss";

export default function TransactionsPage() {
  return (
    <PageContainer title="Transactions">
      <Table />
      <button className="add-button">
        <IoIosAdd />
        Add
      </button>
    </PageContainer>
  );
}
