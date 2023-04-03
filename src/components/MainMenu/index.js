import { NavLink } from "react-router-dom";
import "./styles.scss";

export default function MainMenu() {
  return (
    <nav className="main">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
}
