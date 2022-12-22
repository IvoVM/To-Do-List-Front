import "./ToDoList.css";
import Task from "../Task/Task";
import TaskForm from "../Form/TaskForm";
import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    fetch("http://localhost:3000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.task);
      })
      .catch((err) => console.log(err));
  };

  const eliminateTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).catch((err) => console.log(err));
  };
  const completeTask = (id) => {
    const tareasActualizadas = tasks.map((task) => {
      if (task._id === id) {
        task.completed = !task.completed;
        fetch(`http://localhost:3000/api/tasks/${id}`, {
          method: "PUT",
          body: JSON.stringify({ completed: task.completed }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      }
      return task;
    });
    setTasks(tareasActualizadas);
  };

  return (
    <>
      <TaskForm onSubmit={addTask} />
      <div className="to-do-list-container">
        {tasks.map((task) => (
          <Task
            completeTask={completeTask}
            eliminateTask={eliminateTask}
            id={task._id}
            key={task._id}
            text={task.task}
            complete={task.completed}
          />
        ))}
      </div>
    </>
  );
}
export default ToDoList;
