import { useState } from "react";
import { categoryOptions } from "../../includes/categories";
import { addTransaction } from "../../redux/transactionSlice";
import { useDispatch } from "react-redux";
import "./styles.scss";
import { IoIosAddCircleOutline } from "react-icons/io";
import * as database from "./../../database";
import ProcessingDB from "../ProcessingDB";

export default function FormAddTransaction() {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [sucessMessage, setSucessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSucessMessage("");

    const newErrorMessages = [];

    if (description === "") {
      newErrorMessages.push("The description is required.");
    }
    if (category === "") {
      newErrorMessages.push("The category is required.");
    }
    if (amount === "") {
      newErrorMessages.push("The amount is required.");
    }
    if (parseFloat(amount) === isNaN) {
      newErrorMessages.push("The amount must be a number.");
    }
    if (parseFloat(amount) <= 0) {
      newErrorMessages.push(
        "The amount must be positive and greater than zero."
      );
    }

    setErrorMessage(newErrorMessages);

    if (newErrorMessages.length === 0) {
      setIsSaving(true);

      const data = { description, category, amount, date };
      // update server/db
      const savedTransactionId = await database.save(data);

      // if the addition in the dabatase, update the frontend
      if (savedTransactionId) {
        const dataWithNewId = {
          id: savedTransactionId,
          ...data,
        };

        // update the UI
        dispatch(addTransaction(dataWithNewId));

        setIsSaving(false);

        setErrorMessage("");
        setSucessMessage("Transaction added successfully!");
        setDescription("");
        setCategory("");
        setAmount("");
        setDate("");
      } else {
        setIsSaving(false);
        setErrorMessage(["Failed to add the task!"]);
      }
    }
  };

  if (isSaving) {
    return <ProcessingDB message="Saving..." />;
  }

  return (
    <div className="form-transaction-comp">
      {errorMessage.length > 0 && (
        <div className="invalid-data">
          <p>Invalid data:</p>
          <ul>
            {errorMessage.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {sucessMessage !== "" && (
        <div className="success-message">
          <p>{sucessMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            maxLength={15}
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Category:
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
        </label>

        <label>
          Amount:
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Enter an amount"
            maxLength={8}
            required={true}
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            maxLength={50}
            required={true}
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </label>

        <button>
          <IoIosAddCircleOutline />
          Add
        </button>
      </form>
    </div>
  );
}
