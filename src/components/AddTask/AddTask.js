import React, { useState } from "react";

function AddTask({ showAddTask, setShowAddTask, columnTitle, addItem }) {
  const [task, setTask] = useState({
    id: "",
    title: "",
    tag: "",
    avail: "",
    userID: "",
    status: "",
    priority: "",
    name: "",
  });
  console.log(" reaching here ?? ");
  console.log(" AddTask = ", showAddTask);
  const properties = [
    "id",
    "title",
    "tag",
    "avail",
    "userID",
    "status",
    "priority",
    "name", // Assuming this field is added to the task object
  ];
  function generateInputFields() {
    return properties.map((property) => (
      <div key={property}>
        <label>{property.toUpperCase()} :</label>
        <input
          type="text"
          name={property}
          value={task[property]}
          onChange={(e) => handleInputChange(e, property)}
        />
      </div>
    ));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <>

      <div className="AddTaskWrapper">
        <h3 className="p1 m1">Add task in {columnTitle}</h3>
        {/* <p className="mtl2">Task</p> */}
        {generateInputFields()}

        <div className="actionButtons">
          <button className="cancel m1" onClick={() => setShowAddTask(false)}>
            Cancel
          </button>
          <button
            className="save m1"
            onClick={() => addItem(task, columnTitle)}
          >
            Save
          </button>
        </div>
      </div>

    </>
  );
}

export default AddTask;
