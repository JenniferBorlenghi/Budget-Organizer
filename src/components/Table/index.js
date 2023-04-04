import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTransaction,
  editTransaction,
} from "../../redux/transactionSlice";
import NotFoundPage from "./../../pages/NotFoundPage";
import { useState } from "react";
import { categoryOptions } from "../../includes/categories";

export default function Table({ isEditing }) {
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transaction = useSelector((state) =>
    state.transaction.transactions.find(
      (transaction) => transaction.id === isEditing
    )
  );

  const [description, setDescription] = useState(
    transaction ? transaction.description : ""
  );
  const [category, setCategory] = useState(
    transaction ? transaction.category : ""
  );
  const [amount, setAmount] = useState(transaction ? transaction.amount : "");
  const [date, setDate] = useState(transaction ? transaction.date : "");

  // if the transation was not found through the id and it is edit mode
  // return page not found
  if (!transaction && isEditing) {
    return <NotFoundPage />;
  }

  const handleEditTransaction = (id) => {
    navigate("/edit/" + id);
  };
  console.log("id", isEditing);

  const handleRemoveTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  const handleUpdateTransaction = (id) => {
    const newTransaction = { id, description, category, amount, date };
    dispatch(editTransaction(newTransaction));
    navigate("/transactions");
  };

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
          {transactions.map((transaction) => {
            if (isEditing && transaction.id === isEditing) {
              return (
                <tr key={transaction.id}>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      maxLength={50}
                      required={true}
                    />
                  </td>
                  <td>
                    {" "}
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">- Select -</option>
                      {categoryOptions.map((cat) => (
                        <option value={cat} key={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                      maxLength={8}
                      required={true}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                      maxLength={50}
                      required={true}
                    />
                  </td>
                  <td className="action-save-column">
                    <div className="save-column">
                      <button
                        onClick={() => handleUpdateTransaction(transaction.id)}
                      >
                        <MdOutlineEditNote />
                        <span>Save</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.date}</td>
                  <td>
                    <div className="action-column">
                      <button
                        onClick={() => handleEditTransaction(transaction.id)}
                        className="edit-button"
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        onClick={() => handleRemoveTransaction(transaction.id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
