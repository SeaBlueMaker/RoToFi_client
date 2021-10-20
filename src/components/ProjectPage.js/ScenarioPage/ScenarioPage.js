import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { TimeLine } from "./TimeLine";

import PlotEditor from "./PlotEditor/PlotEditor";
import ScenarioPageManual from "./SenarioPageManual";

import "./style.scss";

export default function ScenarioPage({ isManualOpened }) {
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
        {isManualOpened && <ScenarioPageManual />}
        <div className="timeline">
          <DndProvider backend={HTML5Backend}>
            <TimeLine selectedPlot={selectedPlot} handleSelectedPlot={setSelectedPlot} />
          </DndProvider>
        </div>
        <div className="editor">
          <PlotEditor plot={selectedPlot} handlePlotChange={setPlotList} />
        </div>
      </div>
    </>
  );
}
