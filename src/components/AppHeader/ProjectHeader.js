import Logo from "./Logo";
import UserMenu from "./UserMenu";

import "./style.scss";

export default function ProjectHeader() {
  return (
    <div className="header__background-project page">
      <div className="header page--width-80">
        <Logo type={"white"} />
        <UserMenu />
      </div>
    </div>
  );
}
