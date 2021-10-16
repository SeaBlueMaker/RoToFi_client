import Dialogue from "./Dialogue";

export default function DialogueList({ dialogues }) {
  return (
    <div className="main-content main-content__full-height">
      {dialogues.map((dialogue) => (
        <Dialogue key={dialogue._id} data={dialogue} />
      ))}
    </div>
  );
}
