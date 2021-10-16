import { useSelector } from "react-redux";

export default function Dialogue({ data }) {
  const { characters } = useSelector(state => state.characters);

  const { character, script } = data;

  const characterData = characters.find((element) => element._id === character);

  return (
    <div className="dialogue">
      <div className="dialogue__name">
        {characterData.name}
      </div>
      <div className="dialogue__script">
        {script}
      </div>
    </div>
  );
}
