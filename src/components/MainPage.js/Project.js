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
    <div className="card">
      <div>{title}</div>
      <div>{description}</div>
      <button className="delete-button" onClick={handleOnClick}>
        <img src="/images/delete_button.png" alt="삭제 버튼" />
      </button>
    </div>
  );
}
