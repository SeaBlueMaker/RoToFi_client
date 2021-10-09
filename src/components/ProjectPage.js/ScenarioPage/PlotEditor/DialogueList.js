import Dialogue from "./Dialogue";

export default function DialogueList({ dialogues }) {
  return (
    <div className="main-content">
      리스트
      {dialogues.map((dialogue) => (
        <Dialogue key={dialogue._id} data={dialogue} />
      ))}
    </div>
  );
}
