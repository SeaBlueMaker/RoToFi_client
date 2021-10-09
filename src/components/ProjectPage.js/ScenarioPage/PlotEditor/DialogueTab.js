import { useSelector } from "react-redux";

import DialogueList from "./DialogueList";
import InputBar from "./InputBar";

export default function DialogueTab({ plot, handlePlotChange }) {
  const characters = useSelector(state => state.characters.characters);

  return (
    <div className="dialogue-tab">
      <DialogueList characters={characters} dialogues={plot.dialogues} />
      <InputBar
        characters={characters}
        plot={plot}
        handlePlotChange={handlePlotChange}
      />
    </div>
  );
}
