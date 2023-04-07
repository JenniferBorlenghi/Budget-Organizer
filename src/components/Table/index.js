import "./styles.scss";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTransaction,
  editTransaction,
} from "../../redux/transactionSlice";
import { useState } from "react";
import { categoryOptions } from "../../includes/categories";
import { CADFormat } from "../../includes/currencyFormat";

export default function Table() {
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [transactionToEdit, setTransactionToEdit] = useState("");

  const handleEditTransaction = (currentTransaction) => {
    setTransactionToEdit(currentTransaction);
  };

  const handleRemoveTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  const handleUpdateTransaction = (
    id,
    newDescription,
    newCategory,
    newAmount,
    newDate
  ) => {
    if (
      newDescription === "" ||
      newCategory === "" ||
      newAmount === "" ||
      newDate === ""
    ) {
      setErrorMessage("Please, fill out all fields!");
    } else if (parseFloat(newAmount) < 0) {
      setErrorMessage("The amount must be positive and greater than zero.");
    } else if (parseFloat(newAmount) === isNaN) {
      setErrorMessage("The amount must be a number.");
    } else {
      setErrorMessage("");
      const newTransaction = {
        id,
        description: newDescription,
        category: newCategory,
        amount: newAmount,
        date: newDate,
      };
      dispatch(editTransaction(newTransaction));
      setTransactionToEdit("");
    }
  };

  const ViewMode = ({ transaction }) => {
    const amountClass =
      transaction.category === "Savings" ||
      transaction.category === "Salary" ||
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
              onClick={() => handleEditTransaction(transaction)}
              className="edit-button"
            >
              <AiFillEdit />
            </button>
            <button onClick={() => handleRemoveTransaction(transaction.id)}>
              <AiFillDelete />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const EditMode = ({ transaction }) => {
    const [description, setDescription] = useState(transaction.description);
    const [category, setCategory] = useState(transaction.category);
    const [amount, setAmount] = useState(transaction.amount);
    const [date, setDate] = useState(transaction.date);
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
              onClick={() =>
                handleUpdateTransaction(
                  transaction.id,
                  description,
                  category,
                  amount,
                  date
                )
              }
            >
              <MdOutlineEditNote />
              <span>Save</span>
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const Transactions = () => {
    // change the transactions to order it from the most recent to the most old date
    const orderedTransactions = transactions.map((item) => ({
      ...item,
      dateObj: new Date(item.date),
    }));

    orderedTransactions.sort((a, b) => b.dateObj - a.dateObj);

    const list = orderedTransactions.map((transaction) => {
      const isEditing = transactionToEdit.id === transaction.id;
      if (isEditing) {
        return <EditMode key={transaction.id} transaction={transaction} />;
      }
      return <ViewMode key={transaction.id} transaction={transaction} />;
    });
    return list;
  };

  return (
    <div className="transaction-comp">
      {errorMessage !== "" && (
        <div className="error-message">{errorMessage}</div>
      )}

      {transactions.length > 0 && (
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
          <tbody>{<Transactions />}</tbody>
        </table>
      )}

      {transactions.length === 0 && <div>No transactions yet!</div>}
    </div>
  );
}
