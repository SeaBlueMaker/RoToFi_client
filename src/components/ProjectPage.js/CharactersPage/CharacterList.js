import "../style.scss";

export default function CharacterList({ characterList, handleOnClick }) {
  const { characters } = characterList;

  return (
    <div className="character-names">
      {characters && (
        characters.map((character) => {
          return (
            <div key={character._id} onClick={() => handleOnClick(character)}>
              {character.name}
            </div>
          );
        })
      )}
    </div>
  );
}
