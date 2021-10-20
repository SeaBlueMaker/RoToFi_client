import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { deletePlot } from "../../../api/service";

import { removePlot } from "../../../modules/plots";

import { PLOT_CARD } from "../../../modules/dndTypes";

import {
  CONFIRM_DELETE_CARD,
  CREATE_NEW_CARD,
  FAILED_BASIC,
  OK
} from "../../../constants/messages";

export const Card = ({ data, projectId, index, moveCard, selectedPlot, handleSelectedCard, plots }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const {
    _id: id,
    situation: text,
    isTimeFlag,
  } = data;

  const isSelectedPlot = id === selectedPlot._id;

  const [{ handlerId }, drop] = useDrop({
    accept: PLOT_CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: PLOT_CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const handleCardClick = () => {
    handleSelectedCard(data);
  };

  const handleCardDelete = async () => {
    const answer = window.confirm(CONFIRM_DELETE_CARD);

    if (!answer) return;

    if (index === 0) {
      alert(CREATE_NEW_CARD);

      return;
    }

    const resource = { projectId, plotId: id };
    const response = await deletePlot(resource);

    if (response.result !== OK) {
      alert(FAILED_BASIC);
    }

    handleSelectedCard(plots[index - 1]);
    dispatch(removePlot(index));
  };

  return (
    <>
      {isSelectedPlot && (
        <div
          className={isTimeFlag ? "chapter-card-selected card--hover" : "plot-card-selected card--hover"}
          title="더블클릭 시 삭제됩니다."
          ref={ref}
          style={{ opacity }}
          data-handler-id={handlerId}
          onClick={handleCardClick}
          onDoubleClick={handleCardDelete}
        >
          <div className={isTimeFlag ? "chapter-card__text" : "plot-card__text"}>
            {text}
          </div>
        </div>
      )}
      {!isSelectedPlot && (
        <div
          className={isTimeFlag ? "chapter-card card--hover" : "plot-card card--hover"}
          title="더블클릭 시 삭제됩니다."
          ref={ref}
          style={{ opacity }}
          data-handler-id={handlerId}
          onClick={handleCardClick}
          onDoubleClick={handleCardDelete}
        >
          <div className={isTimeFlag ? "chapter-card__text" : "plot-card__text"}>
            {text}
          </div>
        </div>
      )}
    </>
  );
};
