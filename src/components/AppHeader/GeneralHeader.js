import Logo from "./Logo";
import UserMenu from "./UserMenu";

import "./style.scss";

export default function GeneralHeader() {
  return (
    <div className="general-header-background">
      <div className="header">
        <Logo type={"black"} />
        <UserMenu />
      </div>
    </div>
  );
}
