import { useEffect, useState } from "react";

import Navigation from "./Navigation";

import { getProject } from "../../api/service";

import "./style.scss";

export default function ProjectPage() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getProject();

      const { project } = data;

      setProject(project);
    })();
  }, []);

  return (
    <div>
      <Navigation />
    </div>
  );
}
