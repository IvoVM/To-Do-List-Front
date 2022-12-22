import "./App.css";
import ToDoList from "./components/ToDoList/ToDoList";

function App() {
  return (
    <div className="App">
      <div className="to-do-list">
        <h1>Mis Tareas</h1>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
