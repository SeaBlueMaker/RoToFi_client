import { useState } from "react";
import { useHistory } from "react-router";

import { createProject } from "../../api/service";

import {
  EXCESSIVE_DESCRIPTION_LENGTH,
  OK
} from "../../constants/messages";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

    if (description.length > 200) {
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
    <div>
      <label>
        <input type="text" placeholder="작품명" onChange={handleTitleChange} />
        <input type="text" placeholder="작품설명" onChange={handleDescriptionChange} />
      </label>
      <button onClick={handleSubmitClick}>완료</button>
      <button onClick={handleCancelClick}>취소</button>
    </div>
  );
}
