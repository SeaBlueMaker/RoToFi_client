import { useState } from "react";
import { useHistory } from "react-router";

import { createProject } from "../../api/service";

import Button from "../Button";

import {
  EXCESSIVE_DESCRIPTION_LENGTH,
  OK
} from "../../constants/messages";

import "./style.scss";

export default function NewProjectPage() {
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");

  const history = useHistory();

  const userId = localStorage.getItem("userId");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmitClick = async () => {
    const resource = { creatorId: userId, title, description };

    if (description.length > 1000) {
      alert(EXCESSIVE_DESCRIPTION_LENGTH);

      return;
    }

    const { result } = await createProject(resource);

    if (result === OK) {
      history.push("/projects");
    }
  };

  const handleCancelClick = async () => {
    history.push("/projects");
  };

  return (
    <div className="page--align">
      <div className="page__content__box">
        <input
          className="title"
          type="text"
          placeholder="작품명을 입력하세요"
          onChange={handleTitleChange}
        />
        <textarea
          className="description"
          placeholder="작품설명을 입력하세요"
          onChange={handleDescriptionChange}
        />
        <div className="button-set--align">
          <Button
            className="button button--square button--blue pop"
            content="Create"
            onClick={handleSubmitClick}
          />
          <Button
            className="button button--square button--red pop"
            content="Cancel"
            onClick={handleCancelClick}
          />
        </div>
      </div>
    </div>
  );
}
