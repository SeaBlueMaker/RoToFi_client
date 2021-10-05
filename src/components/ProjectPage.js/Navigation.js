import { useParams } from "react-router";

import {
  CHARACTERS,
  PLOT,
} from "../../constants/navigation";

export default function Navigation() {
  const { id: projectId } = useParams();

  const menuList = [CHARACTERS, PLOT];

  return (
    <div className="nav-background">
      <div className="header">
        {menuList.map((menu) => {
          const query = `/projects/${projectId}?menu=${menu}`;

          return (
            <a key={menu} href={query} className="menu">
              {menu}
            </a>
          );
        })}
        <div className="project-title">작품명</div>
      </div>
    </div>
  );
}
