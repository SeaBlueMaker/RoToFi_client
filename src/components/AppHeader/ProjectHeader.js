import Logo from "./Logo";
import UserMenu from "./UserMenu";

import "./style.scss";

export default function ProjectHeader() {
  return (
    <div className="project-header-background">
      <div className="header">
        <Logo type={"white"} />
        <UserMenu />
      </div>
    </div>
  );
}
