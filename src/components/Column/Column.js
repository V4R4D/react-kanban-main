import React, { useState, useEffect, useLayoutEffect } from "react";
import AddTask from "../AddTask/AddTask";
import "../../App.css";

function generateRandomColor() {
  const colors = [
    "violet",
    "indigo",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  return randomColor;
}

function Column({
  data,
  setData,
  OriginalData,
  setOriginalData,
  updateAppState,
}) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  const openAddNewTaskAddTask = (colTitle) => {
    setSelectedColumn(colTitle);
    setShowAddTask(true);
  };

  const addItem = (task, column) => {
    setShowAddTask(false);
    console.log(" task =", task, " colum = ", column);

    //   const updatedData = { ...prevData };

    //   if (updatedData[column]) {
    //     updatedData[column] = [...updatedData[column], task];
    //   } else {
    //     updatedData[column] = [task];
    //   }
    //   return updatedData;
    // });

    // setOriginalData((prevOriginalData) => [...prevOriginalData, task]);
    // updateAppState();  // will store all changes but last one

    const updatedData = { ...data };
    if (updatedData[column]) {
      updatedData[column] = [...updatedData[column], task];
    } else {
      updatedData[column] = [task];
    }

    const updatedOriginalData = [...OriginalData, task];

    setData(updatedData);
    setOriginalData(updatedOriginalData);
    updateAppState(updatedData, updatedOriginalData);
  };

  const handleDelete = (id, status) => {
    const updatedData = { ...data };
    const newData = updatedData[status].filter((item) => item.id !== id);
    updatedData[status] = newData;

    const updatedOriginalData = OriginalData.filter((item) => item.id !== id);

    setData(updatedData);
    setOriginalData(updatedOriginalData);
    updateAppState(updatedData, updatedOriginalData);
  };

  return (
    <div className="columns">
      {data &&
        Object.keys(data).map((status, index) => (
          <div className="column" key={index}>
            <div className="columnHeading">
            <h3>
          {(() => {
            switch (status) {
              case "4":
                return "Urgent";
              case "3":
                return "High";
              case "2":
                return "Medium";
              case "1":
                return "Low";
              case "0":
                return "No priority";
              default:
                return status;
            }
          })()}
        </h3>
              <button
                className="addNew"
                onClick={() => openAddNewTaskAddTask(status)}
                title="Add Task"
              >
                <strong>+</strong>
              </button>
            </div>
            <div className="items">
              {data && data[status] ? (
                Array.isArray(data[status]) ? (
                  data[status].map((ticket, ticketIndex) => (
                    <div
                      className="item"
                      key={ticket.id}
                      color={generateRandomColor()}
                      title={ticket.name}
                    >
                      <p>{ticket.id}</p>
                      <p>
                        <strong>{ticket.title}</strong>
                      </p>
                      <p>
                        {Array.isArray(ticket.tag)
                          ? ticket.tag.join(", ")
                          : ticket.tag}
                      </p>
                      <p>Available: {ticket.avail ? "Yes" : "No"}</p>
                      {/* <p>User ID: {ticket.userID}</p> */}
                      <p
                        style={{
                          color:
                            ticket.status === "Todo"
                              ? "blue"
                              : ticket.status === "In progress"
                              ? "green"
                              : ticket.status === "Backlog"
                              ? "red"
                              : "inherit",
                        }}
                      >
                        {ticket.status}
                      </p>
                      <p>
                        <strong>Priority : {ticket.priority}</strong>
                      </p>
                      <button
                        onClick={() => {
                          handleDelete(ticket.id, status);
                        }}
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : ( // incase data is not an array but object.....
                  Object.values(data[status]).map((ticket, ticketIndex) => (
                    <div
                      className="item"
                      key={ticket.id}
                      color={generateRandomColor()}
                      style={{
                        borderTop: `4px solid ${generateRandomColor()}`,
                      }}
                    >
                      <p>{ticket.id}</p>
                      <p>
                        <strong>{ticket.title}</strong>
                      </p>
                      <p>
                        {Array.isArray(ticket.tag)
                          ? ticket.tag.join(", ")
                          : ticket.tag}
                      </p>
                      <p>Available: {ticket.avail ? "Yes" : "No"}</p>
                      {/* <p>User ID: {ticket.userID}</p> */}
                      <p>{ticket.status}</p>
                      <p>{ticket.priority}</p>

                      <button
                        onClick={() => handleDelete(ticket.id, status)}
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )
              ) : (
                <p> data is empty</p>
              )}
            </div>
          </div>
        ))}
      {showAddTask && (
        <AddTask
          showAddTask={showAddTask}
          setShowAddTask={setShowAddTask}
          columnTitle={selectedColumn}
          addItem={addItem}
        />
      )}
    </div>
  );
}

export default Column;
