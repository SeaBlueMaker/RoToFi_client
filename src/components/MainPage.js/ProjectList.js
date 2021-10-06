import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearCharacters } from "../../modules/characters";

import Project from "./Project";

export default function ProjectList({ projects }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCharacters());
  }, []);

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
