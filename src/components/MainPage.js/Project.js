import { useHistory } from "react-router";

import { deleteProject } from "../../api/service";

import Button from "../Button";

import { OK } from "../../constants/messages";

export default function Project({ project }) {
  const { _id, title, description } = project;

  const history = useHistory();

  const handleOnClick = async () => {
    const answer = window.confirm("카드를 삭제하시겠습니까?");

    if (!answer) return;

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
      <div className="button--flex">
        <Button
          className="button button--round button--white"
          content="Delete"
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
}
