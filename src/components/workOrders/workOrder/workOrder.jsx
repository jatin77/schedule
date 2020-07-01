import React from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { ItemTypes } from "../../../utility/itemType";

const orderStyle = {
  cursor: "move",
  fontSize: "12px",
  border: "1px solid #ccc",
  width: "fit-content",
  padding: ".5rem",
  textAlign: "center",
};
const orderParaStyle = {
  margin: 0,
  padding: ".2rem 0",
};
const WorkOrder = ({ workOrder }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.WORKORDER, workOrder: workOrder },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div style={{ margin: !workOrder.Employee ? "1rem" : null }}>
      <div
        ref={drag}
        style={{
          ...orderStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <p style={{ ...orderParaStyle, borderBottom: "1px dashed #ccc" }}>
          {workOrder.name}
        </p>
        <p style={orderParaStyle}>{workOrder.jobname}</p>
      </div>
    </div>
  );
};

export default WorkOrder;
