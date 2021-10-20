import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../Button";

import CharacterList from "./CharacterList";
import CharactersPageManual from "./CharactersPageManual";
import Information from "./Information";
import NewCharacter from "./NewCharacter";

export default function CharactersPage({ isManualOpened }) {
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
      {isManualOpened && <CharactersPageManual />}
      <div className="character-page__list-wrap">
        {characters && <CharacterList characterList={characters} handleOnClick={setShowingCharacter} />}
        <Button
          className="button button--square button--transparent pop"
          content="Add More!"
          onClick={handleOnClick}
        />
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
