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

export default function Table() {
  const transactions = useSelector((state) => state.transaction.transactions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [transactionToEdit, setTransactionToEdit] = useState("");

  // useEffect(() => {
  //   setDescription(transactionToEdit.description);
  //   setCategory(transactionToEdit.category);
  //   setAmount(transactionToEdit.amount);
  //   setDate(transactionToEdit.date);
  // }, [transactionToEdit]);

  const handleEditTransaction = (currentTransaction) => {
    console.log("current", currentTransaction);
    setTransactionToEdit(currentTransaction);
    // setDescription(currentTransaction.description);
    // setCategory(currentTransaction.category);
    // setAmount(currentTransaction.amount);
    // setDate(currentTransaction.date);
  };

  const handleRemoveTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  const handleUpdateTransaction = (id) => {
    // if (description === "" || category === "" || amount === "" || date === "") {
    //   setErrorMessage("Please, fill out all fields!");
    // } else if (parseFloat(amount) < 0) {
    //   setErrorMessage("Please, enter a positive amount!");
    // } else {
    //   setErrorMessage("");
    //   const newTransaction = { id, description, category, amount, date };
    //   dispatch(editTransaction(newTransaction));
    //   navigate("/transactions");
    // }
  };

  const ViewMode = ({ transaction }) => {
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
        {/* <td>
          {" "}
          <select
            value={transaction.category}
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
            value={transaction.amount}
            maxLength={8}
            required={true}
          />
        </td>
        <td>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={transaction.date}
            maxLength={50}
            required={true}
          />
        </td>
        <td className="action-save-column">
          <div className="save-column">
            <button onClick={() => handleUpdateTransaction(transaction.id)}>
              <MdOutlineEditNote />
              <span>Save</span>
            </button>
          </div>
        </td> */}
      </tr>
    );
  };

  const Transactions = () => {
    const list = transactions.map((transaction) => {
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
    </div>
  );
}

// {transactionToEdit !== "" &&
// transactions.map((transaction) => {
//   if (transactionToEdit.id === transaction)
//     return (
//       <tr key={transaction.id}>
//         <td>
//           <input
//             type="text"
//             onChange={(e) => setDescription(e.target.value)}
//             value={description}
//             maxLength={50}
//             required={true}
//           />
//         </td>
//         <td>
//           {" "}
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">- Select -</option>
//             {categoryOptions.map((cat) => (
//               <option value={cat} key={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </td>
//         <td>
//           <input
//             type="number"
//             onChange={(e) => setAmount(e.target.value)}
//             value={amount}
//             maxLength={8}
//             required={true}
//           />
//         </td>
//         <td>
//           <input
//             type="date"
//             onChange={(e) => setDate(e.target.value)}
//             value={date}
//             maxLength={50}
//             required={true}
//           />
//         </td>
//         <td className="action-save-column">
//           <div className="save-column">
//             <button
//               onClick={() =>
//                 handleUpdateTransaction(transaction.id)
//               }
//             >
//               <MdOutlineEditNote />
//               <span>Save</span>
//             </button>
//           </div>
//         </td>
//       </tr>
//     );
// })}
