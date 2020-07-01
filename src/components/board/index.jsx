import React, { Component } from "react";
import BoardSquare from "../boardSquare";
import EmployeeList from "../../data/getEmployeeList.json";
import DateList from "../../data/getDates.json";
import PostWorkOrderList from "../../data/postWorkOrderList.json";
import TableHeader from "../tableHeader";
import WorkOrder from "../workOrders/workOrder/workOrder";
import WorkOrders from "../workOrders";
import WorkOrdersList from "../../data/getWorkOrderList.json";
import NameCol from "../nameCol";

/** Styling properties applied to the board element */
const boardStyle = {
  width: "100%",
  height: "400px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
};

const tableWrap = {
  width: "100%",
  height: "100%",
};

/** Styling properties applied to each square element */
const squareStyle = { width: "16.66%", height: "12.5%" };

class Board extends Component {
  state = {
    employees: [],
    squares: [],
    dates: [],
    postWorkOrderList: [],
    workOrdersList: [],
  };

  componentDidMount() {
    this.setState(
      {
        employees: EmployeeList.Employess,
        dates: DateList.dates,
        postWorkOrderList: PostWorkOrderList,
        workOrdersList: WorkOrdersList,
      },
      () => this.setSquares()
    );
  }

  renderSquare(i) {
    const x = i % 6;
    const y = Math.floor(i / 6);

    const ordersList = [];
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
    this.state.postWorkOrderList.job.map((item) => {
      item.workorders.map((order) => {
        ordersList.push({
          ...order,
          jobname: item.jobname,
          x: assignDateCol(order.Date),
        });
      });
    });

    const found = ordersList.find((order) => {
      if (
        order.Date === this.state.dates[x].Date &&
        order.Employee === this.state.employees[y].Name
      ) {
        return order;
      }
    });

    const sendMatch = found;

    return (
      <div key={i}>
        <BoardSquare x={x} y={y} match={sendMatch} addItem={this.addItem}>
          {this.renderPiece(x, y, sendMatch)}
        </BoardSquare>
      </div>
    );
  }

  addItem = (workOrder, x, y) => {
    const employee = this.state.employees[y];
    const date = this.state.dates[x];
    const job = this.state.postWorkOrderList.job.map((item) => {
      if (item.jobname === workOrder.jobname) {
        let orderArr = [];

        const filteredOrders = item.workorders.filter(
          (order) =>
            order.name !== workOrder.name && order.Date !== workOrder.Date
        );

        orderArr = [
          ...filteredOrders,
          {
            name: workOrder.name,
            Date: date.Date,
            Employee: employee.Name,
          },
        ];
        item.workorders = orderArr;
        return item;
      }
      return item;
    });
    const workOrdersList = this.state.workOrdersList.job.map((item) => {
      if (item.jobname === workOrder.jobname) {
        const filterWorkOrders = item.workorders.filter(
          (order) =>
            order.name !== workOrder.name && order.Date !== workOrder.Date
        );
        return { jobname: item.jobname, workorders: filterWorkOrders };
      } else {
        return item;
      }
    });
    this.setState(
      {
        postWorkOrderList: { job },
        workOrdersList: { job: workOrdersList },
      },
      () => this.setSquares()
    );
  };

  renderPiece(x, y, match) {
    return match ? <WorkOrder workOrder={match} /> : null;
  }

  setSquares = () => {
    const squares = [];
    for (
      let i = 0;
      i < this.state.employees.length * this.state.dates.length;
      i += 1
    ) {
      squares.push(this.renderSquare(i));
    }
    this.setState({
      squares: squares,
    });
  };
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <NameCol />
          <div>
            <TableHeader headCols={this.state.dates} />
            <div style={boardStyle}>{this.state.squares}</div>
          </div>
        </div>
        <WorkOrders workOrders={this.state.workOrdersList} />
      </div>
    );
  }
}

export default Board;
