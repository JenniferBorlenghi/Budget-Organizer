import "./styles.scss";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTransaction,
  editTransaction,
  setTransactions,
} from "../../redux/transactionSlice";
import { useState } from "react";
import { categoryOptions } from "../../includes/categories";
import { CADFormat } from "../../includes/currencyFormat";
import { incomeTypes } from "../../includes/categories";
import * as database from "./../../database";
import ProcessingDB from "../ProcessingDB";

export default function Table() {
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [transactionToEdit, setTransactionToEdit] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEditTransaction = (currentTransaction) => {
    setTransactionToEdit(currentTransaction);
  };

  const handleRemoveTransaction = async (id) => {
    const confirmAction = window.confirm("Are you sure?");

    if (confirmAction) {
      // update backend
      const removedTransaction = await database.remove(id);

      if (removedTransaction) {
        // update frontend
        dispatch(removeTransaction(id));
        setErrorMessage("");
      } else {
        alert("Failed to remove the transaction");
        setErrorMessage("Failed to remove the transaction");
      }
    }
  };

  const handleUpdateTransaction = async (
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
      setIsSaving(true);

      const newTransaction = {
        id,
        description: newDescription,
        category: newCategory,
        amount: parseFloat(newAmount),
        date: newDate,
      };

      const data = {
        description: newDescription,
        category: newCategory,
        amount: parseFloat(newAmount),
        date: newDate,
      };
      // update the interface right away
      dispatch(editTransaction(newTransaction));

      const transactionUpdated = await database.updateTransation(id, data);
      if (!transactionUpdated) {
        alert("Failed to update the transaction.");
        setErrorMessage("Failed to update the transaction.");
        // reload from database the data unedited
        const transactions = await database.loadTransactions();
        // set it in the interface
        dispatch(setTransactions(transactions));
        // set to view mode
        setTransactionToEdit("");
        setIsSaving(false);
      } else {
        setTransactionToEdit("");
        setErrorMessage("");
        setIsSaving(false);
      }
    }
  };

  const ViewMode = ({ transaction }) => {
    const amountClass = incomeTypes.includes(transaction.category)
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
      let isEditing = false;
      if (transactionToEdit !== 0) {
        isEditing = transactionToEdit.id === transaction.id;
      }

      if (isEditing) {
        return <EditMode key={transaction.id} transaction={transaction} />;
      }
      return <ViewMode key={transaction.id} transaction={transaction} />;
    });
    return list;
  };

  if (isSaving) {
    return <ProcessingDB message="Saving..." />;
  }

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
