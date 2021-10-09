export default function CharacterSelectBox({ characters, selected, handleSelected }) {
  const handleChangeSelect = (event) => {
    handleSelected(event.target.value);
  };

  return (
    <select
      variant="sort"
      className="select-box-selected"
      onChange={handleChangeSelect}
      value={selected}
    >
      <option value="default" disabled>인물명/지문</option>
      <option value="action">지문</option>
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
