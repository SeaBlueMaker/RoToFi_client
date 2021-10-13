import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { PLOT_CARD } from "../../../modules/dndTypes";

export const Card = ({ data, handleSelectedCard, id, text, index, moveCard, isTimeFlag }) => {
  const ref = useRef(null);

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

  return (
    <div
      className={isTimeFlag ? "chapter-card card--hover" : "plot-card card--hover"}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      onClick={handleCardClick}
    >
      <div className={isTimeFlag ? "chapter-card__text" : "plot-card__text"}>
        {text}
      </div>
    </div>
  );
};