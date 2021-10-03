import { useEffect, useState } from "react";

import { getProjectList } from "../../api/service";

import ProjectList from "./ProjectList";

import "./style.scss";

export default function ProjectListPage() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getProjectList();

      const { projects } = data;

      setProjects(projects);
    })();
  }, []);

  return (
    <>
      <a className="new-project-button-wrap" href="/projects/new">
        <img className="new-project-button" src="/images/new_project_button.png" alt="새 프로젝트 생성 버튼" />
      </a>
      <div className="project-list">
        {projects && <ProjectList projects={projects} />}
      </div>
    </>
  );
}
