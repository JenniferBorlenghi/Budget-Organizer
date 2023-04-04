import "./styles.scss";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { removeTransaction } from "../../redux/transactionSlice";

export default function Table() {
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();

  const handleRemoveTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  let summary = 0;
  transactions.forEach((transaction) => {
    summary += transaction.amount;
  });

  const summaryClass = summary >= 0 ? "positive-sum" : "negative-sum";
  return (
    <div className="transaction-comp">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
              <td className="action-column">
                <div className="action-column">
                  <Link to="/edit">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleRemoveTransaction(transaction.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Summary: <span className={summaryClass}>${summary}</span>
      </h3>
    </div>
  );
}
