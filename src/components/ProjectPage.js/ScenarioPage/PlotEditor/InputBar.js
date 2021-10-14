import { useState } from "react";
import CharacterSelectBox from "./CharacterSelectBox";

import { createDialogue } from "../../../../api/service";

import { OK } from "../../../../constants/messages";

import { insertDialogue } from "../../../../modules/plots";
import { useDispatch } from "react-redux";

export default function InputBar({ characters, plot, handlePlotChange }) {
  const [ inputText, setInputText ] = useState("");
  const [ selectedCharacter, setSelectedCharacter ] = useState("default");

  const dispatch = useDispatch();

  const handleInputChange = (event) => setInputText(event.target.value);

  const handleCreateDialogue = async () => {
    if (selectedCharacter === "default") {
      alert("인물 혹은 지문을 선택해주세요.");

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
        className="textarea-dialogue"
        value={inputText}
        onChange={handleInputChange}
      />
      <button className="complete-button pop" onClick={handleCreateDialogue}>
        <img src="/images/complete_button.png" alt="완료 버튼" />
      </button>
    </div>
  );
}
