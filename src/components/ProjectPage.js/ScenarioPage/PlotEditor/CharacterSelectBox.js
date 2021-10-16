export default function CharacterSelectBox({ characters, selected, handleSelected }) {
  const handleChangeSelect = (event) => {
    handleSelected(event.target.value);
  };

  return (
    <select
      variant="sort"
      className="box--brown"
      onChange={handleChangeSelect}
      value={selected}
    >
      <option value="default" disabled>인물명</option>
      {characters.map((character) => (
        <option
          value={character._id}
          key={character._id}
        >
          {character.name}
        </option>
      ))}
    </select>
  );
}
