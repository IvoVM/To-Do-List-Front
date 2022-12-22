import "./TaskForm.css";
import { useState } from "react";

function TaskForm(props) {
  const [input, setInput] = useState("");

  const manejarCambio = (e) => {
    setInput(e.target.value);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    let tareaNueva = {
      task: input,
      completed: false,
    };
    fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      body: JSON.stringify(tareaNueva),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => props.onSubmit(tareaNueva))
      .catch((err) => console.log(err));
    setInput("");
  };

  return (
    <form className="task-form">
      <input
        name="text"
        className="task-input"
        type="text"
        placeholder="Write a task"
        autoComplete="off"
        onChange={manejarCambio}
        value={input}
      />
      <button className="task-button" onClick={manejarEnvio}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
