import { useState } from "react";
import { useSelector } from "react-redux";

export default function Dialogue({ data }) {
  const [ isEditable, setIsEditable ] = useState(false);
  const [ inputText, setInputText ] = useState("");

  const { characters } = useSelector(state => state.characters);

  const { character, script } = data;

  const characterData = characters.find((element) => element._id === character);

  const handleInputChange = (event) => setInputText(event.target.value);

  return (
    <div className="dialogue">
      <div>{characterData.name}</div>
      {!isEditable && <div>{script}</div>}
      {isEditable && (
        <textarea value={inputText} onChange={handleInputChange} autoFocus/>
      )}
    </div>
  );
}
