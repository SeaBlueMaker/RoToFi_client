import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import CharactersPage from "./CharactersPage/CharactersPage";
import ScenarioPage from "./ScenarioPage/ScenarioPage";

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
      tabName: "시나리오",
      tabComponent: <ScenarioPage />,
    }
  ];

  const tabs = tabContents.map((tab, index) => (
    {
      tabTitle: (
        <div
          className={activeIndex === index ? "is-active nav__category" : "nav__category"}
          onClick={() => handleTabClick(index)}
          key={`tabTitle-${index}`}>
          {tab.tabName}
        </div>
      ),
      tabComponent: (
        <div className="page page--width-80">
          {tab.tabComponent}
        </div>
      )
    }
  ));

  return (
    <div className="tab">
      <div className="nav__background-wrap">
        <ul className="nav__background">
          {tabs.map((tab) => tab.tabTitle)}
        </ul>
      </div>
      <div className="nav__content-wrap">
        {tabs[activeIndex].tabComponent}
      </div>
    </div>
  );
}
