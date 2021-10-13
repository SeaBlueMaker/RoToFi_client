import "../style.scss";

export default function CharacterList({ characterList, handleOnClick }) {
  const { characters } = characterList;

  return (
    <div className="character-page__list">
      {characters && (
        characters.map((character) => {
          return (
            <div
              className="name"
              key={character._id}
              onClick={() => handleOnClick(character)}
            >
              {character.name}
            </div>
          );
        })
      )}
    </div>
  );
}
