import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { TimeLine } from "./TimeLine";

import "./style.scss";

export default function PlotPage() {
  return (
    <>
      <div className="plot-page">
        <DndProvider backend={HTML5Backend}>
          <TimeLine />
        </DndProvider>
        <div className="editor">에디터</div>
      </div>
    </>
  );
}
