import { GiPayMoney } from "react-icons/gi";
import "./styles.scss";
import MainMenu from "../MainMenu";

export default function Header() {
  return (
    <>
      <header>
        <GiPayMoney />
        <div>Budget Organizer</div>
      </header>
      <MainMenu />
    </>
  );
}
