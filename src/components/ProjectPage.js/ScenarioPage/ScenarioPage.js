import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { TimeLine } from "./TimeLine";

import PlotEditor from "./PlotEditor/PlotEditor";

import "./style.scss";

export default function ScenarioPage() {
  const { plots } = useSelector(state => state.plots);

  const [ plotList, setPlotList ] = useState(plots);
  const [ selectedPlot, setSelectedPlot ] = useState(plotList[0]);

  useEffect(() => {
    setPlotList(plots);

    const updatedSelectedPlot = plots.find((plot) => plot._id === selectedPlot._id);

    setSelectedPlot(updatedSelectedPlot);
  }, [plots]);

  return (
    <>
      <div className="scenario-page">
        <DndProvider backend={HTML5Backend}>
          <TimeLine handleSelectedPlot={setSelectedPlot} plots={plotList} />
        </DndProvider>
        <div className="editor">
          <PlotEditor plot={selectedPlot} handlePlotChange={setPlotList} />
        </div>
      </div>
    </>
  );
}
