import Logo from "./Logo";
import UserMenu from "./UserMenu";

import "./style.scss";

export default function GeneralHeader() {
  return (
    <div className="header__background-general page">
      <div className="header page--width-70">
        <Logo type={"black"} />
        <UserMenu />
      </div>
    </div>
  );
}
