import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CharacterList from "./CharacterList";
import Information from "./Information";
import NewCharacter from "./NewCharacter";

export default function CharactersPage() {
  const characters = useSelector(state => state.characters);

  const [ isAddible, setIsAddible ] = useState(false);
  const [ isEditable, setIsEditable ] = useState(false);
  const [ showingCharacter, setShowingCharacter ] = useState(null);

  const handleOnClick = () => {
    setIsAddible(true);
  };

  useEffect(() => {
    const latestCharacter = characters.characters[characters.characters.length - 1];

    setShowingCharacter(latestCharacter);
  }, [characters.characters]);

  return (
    <div className="character-page">
      <div className="character-page__list-wrap">
        {characters && <CharacterList characterList={characters} handleOnClick={setShowingCharacter} />}
        <button className="character-button pop" onClick={handleOnClick}>
          <img src="/images/character_insert_button.png" alt="인물 추가 버튼" />
        </button>
      </div>
      {isAddible && <NewCharacter handleFinishAdd={setIsAddible} />}
      {!isAddible && (
        <Information
          isEditable={isEditable}
          handleEditable={setIsEditable}
          showingCharacter={showingCharacter}
          handleShowingCharacter={setShowingCharacter}
        />
      )}
    </div>
  );
}
