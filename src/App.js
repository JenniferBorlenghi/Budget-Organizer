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

      const settings = await database.loadTransactionsSettings();
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
