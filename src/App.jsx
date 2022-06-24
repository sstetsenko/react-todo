import React, { useContext, useEffect } from "react";
import "./App.css";
import { TodoItem } from "./Todo/TodoItem";
import { TodoControls } from "./Todo/TodoControls";
import { Todos } from "./Todo/Todos";
import { Navigation } from "./Todo/Navigation";
import { AppContext } from "./context";

const App = () => {
  const {
    deleteAll,
    deleteTask,
    todos,
    getAll,
    filteredTasks,
    filterStatus,
    changeFilteredTask,
    changeFilterStatus,
  } = useContext(AppContext);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    changeFilteredTask();
  }, [todos, filterStatus]);

  return (
    <div className="App">
      <div className="wrapper">
        <TodoControls todos={todos} removeAllTasks={deleteAll} />

        <Todos>
          {filteredTasks.map((item) => (
            <TodoItem item={item} key={item._id} removeTask={deleteTask} />
          ))}
        </Todos>

        <Navigation changeFilterStatus={changeFilterStatus} />
      </div>
    </div>
  );
};

export default App;
