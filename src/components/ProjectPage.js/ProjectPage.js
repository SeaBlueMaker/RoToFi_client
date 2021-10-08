import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import CharactersPage from "./CharactersPage/CharactersPage";
import PlotPage from "./PlotPage/PlotPage";

import { getProject } from "../../api/service";

import { insertCharacter } from "../../modules/characters";
import { loadProject } from "../../modules/project";
import { insertPlot } from "../../modules/plots";

import "./style.scss";

export default function ProjectPage() {
  const [ project, setProject ] = useState(null);
  const [ activeIndex, setActiveIndex ] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    (async () => {
      const data = await getProject(id);

      const { project } = data;

      setProject(project);
    })();
  }, []);

  useEffect(() => {
    if (project && project.characters.length > 0) {
      dispatch(insertCharacter(project.characters));
    }

    if (project) {
      const projectData = {
        title: project.title,
        description: project.description,
        _id: project._id,
      };

      dispatch(loadProject(projectData));
    }

    if (project && project.plots.length > 0) {
      dispatch(insertPlot(project.plots));
    }

  }, [project]);

  const tabContents = [
    {
      tabName: "등장인물",
      tabComponent: <CharactersPage />,
    },
    {
      tabName: "플롯",
      tabComponent: <PlotPage />,
    }
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
      <div>
        {tabs[activeIndex].tabComponent}
      </div>
    </>
  );
}
