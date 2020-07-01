import React, { useEffect } from "react";
import EmployeesName from "../../data/getEmployeeList.json";
import { useState } from "react";

function NameCol() {
  const [names, setNames] = useState([]);
  useEffect(() => {
    setNames(EmployeesName.Employess);
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 1fr 1fr",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      {names && names.map((item) => <div key={item.Name}>{item.Name}</div>)}
    </div>
  );
}

export default NameCol;
