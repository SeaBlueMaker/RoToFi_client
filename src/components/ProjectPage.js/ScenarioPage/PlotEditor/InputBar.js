import { useState } from "react";
import CharacterSelectBox from "./CharacterSelectBox";

import { createDialogue } from "../../../../api/service";

import { OK } from "../../../../constants/messages";

import { insertDialogue } from "../../../../modules/plots";
import { useDispatch } from "react-redux";

import Button from "../../../Button";

export default function InputBar({ characters, plot, handlePlotChange }) {
  const [ inputText, setInputText ] = useState("");
  const [ selectedCharacter, setSelectedCharacter ] = useState("default");

  const dispatch = useDispatch();

  const handleInputChange = (event) => setInputText(event.target.value);

  const handleCreateDialogue = async () => {
    if (selectedCharacter === "default") {
      alert("인물명을 선택해주세요.");

      return;
    }

    const resource = {
      plotId: plot._id,
      character: selectedCharacter,
      script: inputText,
    };

    const response = await createDialogue(resource);

    if (response.result === OK) {
      alert("작성이 완료되었습니다.");
    }

    const updatedDialogues = response.updatedPlot.dialogues;

    dispatch(insertDialogue(updatedDialogues, plot._id));
    handlePlotChange(response.updatedPlot);
    setInputText("");
  };

  return (
    <div className="input-bar">
      <CharacterSelectBox
        characters={characters}
        selected={selectedCharacter}
        handleSelected={setSelectedCharacter}
      />
      <textarea
        className="textarea-dialogue box--brown"
        placeholder="대사를 입력하세요"
        wrap="hard"
        cols="20"
        value={inputText}
        onChange={handleInputChange}
      />
      <Button
        className="button button--round button--brown pop"
        content="Save"
        onClick={handleCreateDialogue}
      />
    </div>
  );
}
