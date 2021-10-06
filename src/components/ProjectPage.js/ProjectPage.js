import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import CharactersPage from "./CharactersPage/CharactersPage";

import { getProject } from "../../api/service";

import { insertCharacter } from "../../modules/characters";
import { loadProject } from "../../modules/project";

import "./style.scss";

export default function ProjectPage() {
  const [ project, setProject ] = useState(null);
  const [ activeIndex, setActiveIndex ] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

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
  }, [project]);

  const tabs = [
    {
      tabTitle: (
        <div
          className={activeIndex === 0 ? "is-active menu" : "menu"}
          onClick={() => handleTabClick(0)}
          key="tabTitle-0">
          등장인물
        </div>
      ),
      tabContent: (
        <CharactersPage />
      )
    },
    {
      tabTitle: (
        <div
          className={activeIndex === 1 ? "is-active menu" : "menu"}
          onClick={() => handleTabClick(1)}
          key="tabTitle-1"
        >
          플롯
        </div>
      ),
      tabContent: (
        <div>플롯탭 내용</div>
      )
    }
  ];

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <ul className="nav-background">
        {tabs.map((section) => {
          return section.tabTitle;
        })}
      </ul>
      <div>
        {tabs[activeIndex].tabContent}
      </div>
    </>
  );
}
