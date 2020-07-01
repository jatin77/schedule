import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utility/itemType";
import { Overlay } from "../../utility/overlay";
import { Square } from "../square";

export const BoardSquare = ({ x, y, children, match, addItem }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.WORKORDER,
    canDrop: (props) => !match && props.workOrder.x === x,
    drop: (props, monitor, component) => addItem(props.workOrder, x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square>{children}</Square>
      {isOver && !canDrop && <Overlay color="red" />}
      {!isOver && canDrop && <Overlay color="yellow" />}
      {isOver && canDrop && <Overlay color="green" />}
    </div>
  );
};

export default BoardSquare;
