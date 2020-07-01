import React from "react";
import WorkOrder from "./workOrder/workOrder";

function WorkOrders({ workOrders }) {
  const orders = [];

  const assignDateCol = (date) => {
    switch (date) {
      case "2020-04-20T00:00:00.000Z":
        return 0;
      case "2020-04-21T00:00:00.000Z":
        return 1;
      case "2020-04-22T00:00:00.000Z":
        return 2;
      case "2020-04-23T00:00:00.000Z":
        return 3;
      case "2020-04-24T00:00:00.000Z":
        return 4;
      case "2020-04-25T00:00:00.000Z":
        return 5;
    }
  };
  if (workOrders.job) {
    workOrders.job.map((item) => {
      item.workorders.map((order) => {
        orders.push({
          ...order,
          jobname: item.jobname,
          x: assignDateCol(order.Date),
        });
      });
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "2rem",
          justifyContent: "center",
        }}
      >
        {orders.map((item, i) => (
          <WorkOrder key={i} workOrder={item} />
        ))}
      </div>
    </>
  );
}

export default WorkOrders;
