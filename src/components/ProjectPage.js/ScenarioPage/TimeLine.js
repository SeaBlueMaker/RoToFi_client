import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import update from "immutability-helper";

import { Card } from "./Card";

import {
  createPlot,
  updatePlotOrder
} from "../../../api/service";

import {
  changePlots,
  insertPlot,
} from "../../../modules/plots";

import {
  FAILED_BASIC,
  REFRESH,
  OK,
} from "../../../constants/messages";

import {
  CARD_LOCATION_DESCRIPTION,
  CARD_LOCATION_IMAGE,
  CARD_LOCATION_TITLE,
  CARD_SITUATION
} from "../../../constants/examples";

import Button from "../../Button";

export const TimeLine = ({ handleSelectedPlot }) => {
  const projectId = useSelector(state => state.project._id);
  const { plots } = useSelector(state => state.plots);

  const [ plotCards, setPlotCards ] = useState(plots);
  const [ debounce, setDebounce ] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setPlotCards(plots);
  }, [plots]);

  useEffect(() => {
    const changedPlotCards = plotCards;

    const debounce = setTimeout(() => {
      setDebounce(debounce);
      dispatch(changePlots(changedPlotCards));

      return;
    }, 300);

    return () => clearTimeout(debounce);
  }, [plotCards]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = plotCards[dragIndex];

    setPlotCards(update(plotCards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    }));
  }, [plotCards]);

  const handleSaveOrder = async () => {
    const changedList = plotCards.map((card) => card._id);
    const resource = { projectId, changedList };
    const response = await updatePlotOrder(resource);

    if (response.result !== OK) {
      alert(REFRESH);
    }
  };

  const renderCard = (card, index) => {
    return (
      <Card
        data={card}
        projectId={projectId}
        key={card._id}
        index={index}
        moveCard={moveCard}
        handleSelectedCard={handleSelectedPlot}
        plots={plots}
      />
    );
  };

  const handleCreatePlot = async (boolean) => {
    const resource = {
      projectId,
      isTimeFlag: boolean,
      situation: CARD_SITUATION,
      location: {
        title: CARD_LOCATION_TITLE,
        imageURL: CARD_LOCATION_IMAGE,
        description: CARD_LOCATION_DESCRIPTION,
      },
    };

    const response = await createPlot(resource);

    if (response.result !== OK) {
      alert(FAILED_BASIC);

      return;
    }

    dispatch(insertPlot(response.createdPlot));
  };

  return (
    <>
      <div className="timeline__header">
        <div className="title">Time Line</div>
      </div>
      <div className="card-container-wrap">
        <div className="card-container">
          {plotCards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
      <div className="timeline__buttons">
        <Button
          className="button button--square button--purple"
          content="Add Chapter Card"
          onClick={() => handleCreatePlot(true)}
        />
        <Button
          className="button button--round button--transparent"
          content="Save Order"
          onClick={() => handleSaveOrder(true)}
        />
        <Button
          className="button button--square button--purple"
          content="Add Plot Card"
          onClick={() => handleCreatePlot(false)}
        />
      </div>
    </>
  );
};
