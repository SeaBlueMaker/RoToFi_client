import { Link } from "react-router-dom";

import Project from "./Project";

export default function ProjectList({ projects }) {
  return (
    <div>
      {projects.map((project) => (
        <Link to={`/projects/${project._id}?menu=characters`} key={project._id}>
          <Project project={project} />
        </Link>
      ))}
    </div>
  );
}
