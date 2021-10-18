import { useState } from "react";
import { useDispatch } from "react-redux";
import CharacterSelectBox from "./CharacterSelectBox";

import { createDialogue } from "../../../../api/service";

import {
  FAILED_BASIC,
  SELECT_CHARACTER,
  OK,
} from "../../../../constants/messages";

import { insertDialogue } from "../../../../modules/plots";

import Button from "../../../Button";

export default function InputBar({ characters, plot, handlePlotChange }) {
  const [ inputText, setInputText ] = useState("");
  const [ selectedCharacter, setSelectedCharacter ] = useState("default");

  const dispatch = useDispatch();

  const handleInputChange = (event) => setInputText(event.target.value);

  const handleCreateDialogue = async () => {
    if (selectedCharacter === "default") {
      alert(SELECT_CHARACTER);

      return;
    }

    const resource = {
      plotId: plot._id,
      character: selectedCharacter,
      script: inputText,
    };

    const response = await createDialogue(resource);

    if (response.result !== OK) {
      alert(FAILED_BASIC);
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
