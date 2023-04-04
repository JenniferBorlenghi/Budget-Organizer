import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [
      {
        id: uuidv4(),
        description: "Rent",
        category: "Housing",
        amount: 1700,
        date: Date.now(),
      },
      {
        id: uuidv4(),
        description: "Costco",
        category: "Groceries",
        amount: 450,
        date: Date.now(),
      },
      {
        id: uuidv4(),
        description: "Salary",
        category: "Income",
        amount: 4800,
        date: Date.now(),
      },
    ],
  },
  reducers: {
    // delete
    removeTransaction: (state, action) => {
      const id = action.payload;
      const updatedTransactions = state.transactions.filter(
        (transaction) => transaction.id !== id
      );
      state.transactions = updatedTransactions;
    },

    // edit
    editTransaction: (state, action) => {
      const currentTransaction = action.payload;
      const id = currentTransaction.id;

      state.transactions.forEach((transaction) => {
        if (transaction.id === id) {
          transaction.description = currentTransaction.description;
          transaction.category = currentTransaction.category;
          transaction.amount = currentTransaction.amount;
          transaction.date = currentTransaction.date;
        }
      });
    },
  },
});

export const { removeTransaction, editTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
