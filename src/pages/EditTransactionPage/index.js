import PageContainer from "../../components/PageContainer";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";

export default function EditTransactionPage() {
  const params = useParams();
  const id = params.id;

  return (
    <PageContainer title="Edit Transaction">
      <Table isEditing={id} />
    </PageContainer>
  );
}
