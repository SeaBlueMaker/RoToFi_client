import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import update from "immutability-helper";

import { Card } from "./Card";

import {
  createPlot,
  updatePlotOrder
} from "../../../api/service";

import { insertPlot } from "../../../modules/plots";

import { OK } from "../../../constants/messages";

export const TimeLine = () => {
  const projectId = useSelector(state => state.project._id);
  const { plots } = useSelector(state => state.plots);

  const [ plotCards, setPlotCards ] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setPlotCards(plots);
  }, [plots]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = plotCards[dragIndex];

    setPlotCards(update(plotCards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    }));
  }, [plotCards]);

  const changePlotOrder = async (changedList) => {
    const resource = { projectId, changedList };
    const response = await updatePlotOrder(resource);

    if (response.result !== OK) {
      alert("새로고침이 필요합니다.");
    }
  };

  useEffect(() => {
    const resorted = plotCards.map((card) => card._id);

    changePlotOrder(resorted);
  }, [plotCards]);

  const renderCard = (card, index) => {
    return (
      <Card
        key={card._id}
        index={index}
        id={card._id}
        text={card.situation}
        moveCard={moveCard}
        isTimeFlag={card.isTimeFlag}
      />
    );
  };

  const handleCreatePlot = async (boolean) => {
    const resource = {
      projectId,
      isTimeFlag: boolean,
      situation: "해당 플롯에서 일어나는 상황을 정리하는 공간입니다. 우측 상단의 편집 버튼을 눌러 편집하세요.",
      location: {
        title: "School",
        imageURL: "",
        description: "장소에 대한 설명을 정리하는 공간입니다.",
      },
    };

    const response = await createPlot(resource);

    if (response.result !== OK) {
      alert("플롯을 생성하지 못했습니다. 새로고침 후 다시 시도해주십시오.");

      return;
    }

    dispatch(insertPlot(response.createdPlot));
  };

  return (
    <div className="timeline">
      <div className="header">
        <button className="flag-button" onClick={() => handleCreatePlot(true)}>
          <img src="/images/flag_button.png" alt="플래그 추가 버튼" />
        </button>
        <div className="title">Time Line</div>
        <button className="card-button" onClick={() => handleCreatePlot(false)}>
          <img src="/images/card_button.png" alt="플롯 카드 추가 버튼" />
        </button>
      </div>
      <div>
        <div className="card-container">
          {plotCards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </div>
  );
};
