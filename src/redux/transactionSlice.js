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
        date: "2023-04-10",
      },
      {
        id: uuidv4(),
        description: "Costco",
        category: "Groceries",
        amount: 450,
        date: "2023-04-02",
      },
      {
        id: uuidv4(),
        description: "Salary",
        category: "Salary",
        amount: 4800,
        date: "2023-04-03",
      },
    ],
  },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },

    removeTransaction: (state, action) => {
      const id = action.payload;
      const updatedTransactions = state.transactions.filter(
        (transaction) => transaction.id !== id
      );
      state.transactions = updatedTransactions;
    },

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

    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const {
  addTransaction,
  removeTransaction,
  editTransaction,
  setTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
