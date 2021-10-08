import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Project from "./Project";

import { clearCharacters } from "../../modules/characters";
import { clearPlots } from "../../modules/plots";

export default function ProjectList({ projects }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCharacters());
    dispatch(clearPlots());
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
