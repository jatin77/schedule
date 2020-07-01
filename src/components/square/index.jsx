import React from "react";
const squareStyle = {
  width: "100%",
  height: "100%",
  border: "1px solid",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
};
export const Square = ({ children }) => {
  return (
    <div
      style={{
        ...squareStyle,
      }}
    >
      {children}
    </div>
  );
};
