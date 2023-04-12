import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

/**
 * Function that load transactions from the database - firebase
 * @returns
 *  Array with the transactions
 */
export async function loadTransactions() {
  try {
    const querySnapshot = await getDocs(collection(db, "transactions"));

    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    return data;
  } catch (error) {
    throw new Error("Failed to load the database.");
  }
}

/**
 * Function that load transactions settings from the database - firebase
 * @returns
 *  Array with the settings
 */
export async function loadTransactionsSettings() {
  try {
    const querySnapshot = await getDocs(collection(db, "settings"));

    const data = [];

    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    return data;
  } catch (error) {
    throw new Error("Failed to load the database.");
  }
}
