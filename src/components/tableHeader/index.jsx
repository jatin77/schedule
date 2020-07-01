import React from "react";
const headStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
  padding: "1rem 0",
  justifyItems: "center",
};
function TableHeader({ headCols }) {
  return (
    <div style={headStyle}>
      {headCols.map((item) => (
        <div key={item.Date}>
          {new Date(item.Date).getDate()}-{new Date(item.Date).getMonth()}-
          {new Date(item.Date).getFullYear()}
        </div>
      ))}
    </div>
  );
}

export default TableHeader;
