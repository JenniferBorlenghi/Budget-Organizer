import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTransaction,
  editTransaction,
} from "../../redux/transactionSlice";
import { useEffect, useState } from "react";
import { categoryOptions } from "../../includes/categories";
import { CADFormat } from "../../includes/currencyFormat";

export default function Table({ currentTransaction }) {
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setDescription(currentTransaction.description);
    setCategory(currentTransaction.category);
    setAmount(currentTransaction.amount);
    setDate(currentTransaction.date);
  }, [currentTransaction]);

  const handleEditTransaction = (id) => {
    navigate("/edit/" + id);
  };

  const handleRemoveTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  const handleUpdateTransaction = (id) => {
    if (description === "" || category === "" || amount === "" || date === "") {
      setErrorMessage("Please, fill out all fields!");
    } else if (parseFloat(amount) < 0) {
      setErrorMessage("Please, enter a positive amount!");
    } else {
      setErrorMessage("");
      const newTransaction = { id, description, category, amount, date };
      dispatch(editTransaction(newTransaction));
      navigate("/transactions");
    }
  };

  return (
    <div className="transaction-comp">
      {errorMessage !== "" && (
        <div className="error-message">{errorMessage}</div>
      )}
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
            if (currentTransaction.id === transaction.id) {
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
              const amountClass =
                transaction.category === "Income" ||
                transaction.category === "Leasing" ||
                transaction.category === "Investments"
                  ? "income-amount"
                  : "expense-amount";
              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td className={amountClass}>
                    <p>{CADFormat.format(transaction.amount)}</p>
                  </td>
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
