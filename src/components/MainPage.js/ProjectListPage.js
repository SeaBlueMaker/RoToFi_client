import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { getProjectList } from "../../api/service";

import ProjectList from "./ProjectList";
import Button from "../Button";

import "./style.scss";

export default function ProjectListPage() {
  const [ projects, setProjects ] = useState(null);

  const history = useHistory();

  const handleOnClick = () => {
    history.push("/projects/new");
  };

  useEffect(() => {
    (async () => {
      const data = await getProjectList();

      const { projects } = data;

      setProjects(projects);
    })();
  }, []);

  return (
    <div className="page page--width-70">
      <div className="new-project-button-wrap">
        <Button
          className="button button--square button--transparent pop"
          content="Make New Project"
          onClick={handleOnClick}
        />
      </div>
      <div className="list-box">
        {projects && <ProjectList projects={projects} />}
      </div>
    </div>
  );
}
