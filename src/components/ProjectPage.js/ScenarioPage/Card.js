import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { deletePlot } from "../../../api/service";

import { PLOT_CARD } from "../../../modules/dndTypes";

import { OK } from "../../../constants/messages";
import { removePlot } from "../../../modules/plots";

export const Card = ({ data, projectId, index, moveCard, handleSelectedCard, plots }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const {
    _id: id,
    situation: text,
    isTimeFlag,
  } = data;

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
    const answer = window.confirm("카드를 삭제하시겠습니까?");

    if (!answer) return;

    if (index === 0) {
      alert("새 카드를 만든 후 다시 시도해주십시오.");
    }

    const resource = { projectId, plotId: id };
    const response = await deletePlot(resource);

    if (response.result !== OK) {
      alert("삭제하지 못했습니다.");
    }

    handleSelectedCard(plots[index - 1]);
    dispatch(removePlot(index));
  };

  return (
    <div
      className={isTimeFlag ? "chapter-card card--hover" : "plot-card card--hover"}
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
  );
};
