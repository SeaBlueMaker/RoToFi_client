import { useState } from "react";

import DialogueTab from "./DialogueTab";
import SituationTab from "./SituationTab";

import "./style.scss";

export default function PlotEditor({ plot, handlePlotChange }) {
  const [ activeIndex, setActiveIndex ] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const tabContents = [
    {
      tabName: "상황",
      tabComponent: <SituationTab plot={plot} handlePlotChange={handlePlotChange} />,
    },
    {
      tabName: "장소",
      tabComponent: "아직",
    },
    {
      tabName: "대화",
      tabComponent: <DialogueTab plot={plot} handlePlotChange={handlePlotChange} />,
    },
  ];

  const tabs = tabContents.map((tab, index) => (
    {
      tabTitle: (
        <div
          className={activeIndex === index ? "is-active menu" : "menu"}
          onClick={() => handleTabClick(index)}
          key={`tabTitle-${index}`}>
          {tab.tabName}
        </div>
      ),
      tabComponent: (
        tab.tabComponent
      )
    }
  ));

  return (
    <>
      <ul className="nav-background">
        {tabs.map((tab) => (
          tab.tabTitle
        ))}
      </ul>
      <div className="editor-component">
        {tabs[activeIndex].tabComponent}
      </div>
    </>
  );
}
