import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
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
