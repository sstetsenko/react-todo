import React, { useContext, useEffect } from "react";
import "./App.css";
import { TodoItem } from "./Todo/TodoItem";
import { TodoControls } from "./Todo/TodoControls";
import { Todos } from "./Todo/Todos";
import { Navigation } from "./Todo/Navigation";
import { AppContext } from "./context";
import {ITodo} from "./types/types";

const App = () => {
  const {
    todos,
    getAll,
    filteredTasks,
    filterStatus,
    changeFilteredTask,
  } = useContext(AppContext);

  useEffect(() => {
    if(getAll) getAll();
  }, []);

  useEffect(() => {
    if(changeFilteredTask) changeFilteredTask();
  }, [todos, filterStatus]);

  return (
      <div className="App">
        <div className="wrapper">

          <TodoControls />

          <Todos>
            {
              filteredTasks ? filteredTasks.map((item: ITodo) => (
                <TodoItem item = {item} key={item._id}/>
            ))
            :
            ''}
          </Todos>

          <Navigation />

        </div>
      </div>
  );
};

export default App;
