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
    <>
      {projects.map((project) => (
        <Link
          className="list__element card--hover"
          to={`/projects/${project._id}`}
          key={project._id}
        >
          <Project project={project} />
        </Link>
      ))}
    </>
  );
}
