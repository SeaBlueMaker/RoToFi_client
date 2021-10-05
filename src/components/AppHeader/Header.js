import { useEffect, useState } from "react";
import { withRouter } from "react-router";

import GeneralHeader from "./GeneralHeader";
import ProjectHeader from "./ProjectHeader";

const Header = withRouter(({ location }) => {
  const [isProjectPage , setIsProjectPage] = useState(false);

  const { pathname } = location;

  useEffect(() => {
    if (pathname.slice(0, 10) === "/projects/" && pathname.length > 24) {
      setIsProjectPage(true);
    }
  }, [pathname]);

  return (
    <>
      {!isProjectPage && <GeneralHeader />}
      {isProjectPage && <ProjectHeader />}
    </>
  );
});

export default Header;
