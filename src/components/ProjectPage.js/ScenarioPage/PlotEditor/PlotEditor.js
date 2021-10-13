import { useState } from "react";

import DialogueTab from "./DialogueTab";
import LocationTab from "./LocationTab";
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
      tabComponent: <LocationTab plot={plot} handlePlotChange={handlePlotChange} />,
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
          className={activeIndex === index ? "is-active editor__nav__menu" : "editor__nav__menu"}
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
      <ul className="editor__nav">
        {tabs.map((tab) => (
          tab.tabTitle
        ))}
      </ul>
      <div className="editor__component">
        {tabs[activeIndex].tabComponent}
      </div>
    </>
  );
}
