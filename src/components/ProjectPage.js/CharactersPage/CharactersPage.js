import { useState } from "react";
import { useSelector } from "react-redux";

import CharacterList from "./CharacterList";
import Information from "./Information";
import NewCharacter from "./NewCharacter";

export default function CharactersPage() {
  const characters = useSelector(state => state.characters);

  const [ isAddible, setIsAddible ] = useState(false);
  const [ isEditable, setIsEditable ] = useState(false);
  const [ showingCharacter, setShowingCharacter ] = useState(characters.characters[0]);

  const handleOnClick = () => {
    setIsAddible(true);
  };

  return (
    <div className="character-page">
      <div className="character-list">
        {characters && <CharacterList characterList={characters} handleOnClick={setShowingCharacter} />}
        <button className="character-button" onClick={handleOnClick}>
          <img src="/images/character_insert_button.png" alt="인물 추가 버튼" />
        </button>
      </div>
      {isAddible && <NewCharacter handleFinishAdd={setIsAddible} />}
      {!isAddible && (
        <Information
          isEditable={isEditable}
          handleStartEdit={setIsEditable}
          showingCharacter={showingCharacter}
          handleShowingCharacter={setShowingCharacter}
        />
      )}
    </div>
  );
}
