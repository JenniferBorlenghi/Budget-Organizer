import PageContainer from "../../components/PageContainer";
import Table from "../../components/Table";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFoundPage from "../NotFoundPage";

export default function EditTransactionPage() {
  const params = useParams();
  const id = params.id;

  const transaction = useSelector((state) =>
    state.transaction.transactions.find((transaction) => transaction.id === id)
  );

  if (!transaction) {
    return <NotFoundPage />;
  }

  return (
    <PageContainer title="Edit Transaction">
      <Table currentTransaction={transaction} />
      <Link to="/transactions">Return to Transactions</Link>
      <Link to="/dashboard">Return to Dashboard</Link>
    </PageContainer>
  );
}
