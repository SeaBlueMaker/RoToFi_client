import Logo from "./Logo";
import UserMenu from "./UserMenu";

import "./style.scss";

export default function AppHeader() {
  return (
    <div className="header">
      <Logo />
      <UserMenu />
    </div>
  );
}
