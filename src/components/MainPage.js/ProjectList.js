import Project from "./Project";

export default function ProjectList({ projects }) {
  return (
    <div>
      {projects.map((project) => (
        <Project key={project._id} project={project} />
      ))}
    </div>
  );
}
