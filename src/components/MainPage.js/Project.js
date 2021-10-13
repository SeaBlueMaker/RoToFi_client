import { useHistory } from "react-router";

import { deleteProject } from "../../api/service";

import { OK } from "../../constants/messages";

export default function Project({ project }) {
  const { _id, title, description } = project;

  const history = useHistory();

  const handleOnClick = async () => {
    try {
      const resource = { projectId: _id };

      const response = await deleteProject(resource);

      if (response === OK) {
        history.push("/projects");
      }
    } catch (error) {
      alert(error.message);

      return;
    }
  };

  return (
    <div className="box--flex">
      <div className="title link--no-effect">{title}</div>
      <div className="description link--no-effect">{description}</div>
      <button className="delete-button button--flex" onClick={handleOnClick}>
        <img src="/images/delete_button.png" alt="삭제 버튼" />
      </button>
    </div>
  );
}
