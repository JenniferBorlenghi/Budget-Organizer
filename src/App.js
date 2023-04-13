import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import * as database from "./database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTransactions } from "./redux/transactionSlice";
import { setSettings } from "./redux/settingsSlice";
import ProcessingDB from "./components/ProcessingDB";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const transactions = await database.loadTransactions();
      dispatch(setTransactions(transactions));

      const firebaseSettingsList = await database.loadTransactionsSettings();
      let settings = {
        id: null,
        Salary: 0,
      };
      if (
        Array.isArray(firebaseSettingsList) &&
        firebaseSettingsList.length > 0
      ) {
        const firebaseSettings = firebaseSettingsList[0];
        settings = {
          id: firebaseSettings.id,
          Housing: firebaseSettings.Housing,
          Utilities: firebaseSettings.Utilities,
          Transportation: firebaseSettings.Transportation,
          Groceries: firebaseSettings.Groceries,
          Personal: firebaseSettings.Personal,
          Clothing: firebaseSettings.Clothing,
          Health: firebaseSettings.Health,
          Leasing: firebaseSettings.Leasing,
          Salary: firebaseSettings.Salary,
          ROI: firebaseSettings.ROI,
        };
      }
      console.log("settings source", settings);
      dispatch(setSettings(settings));
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Header />

      {!isLoading ? (
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/add" element={<AddTransactionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <ProcessingDB message="Loading..." />
      )}

      <Footer />
    </>
  );
}

export default App;
