import { useContext, useEffect, FC } from "react";
import "./App.css";
import { TodoItem, TodoControls, Todos, Navigation } from "./Todo/index";
import { AppContext } from "./Context";
import { TodoType } from "./types";

export const App: FC<TodoType> = () => {
  const { todos, getAll, filteredTasks, filterStatus, changeFilteredTask } =
    useContext(AppContext);

  useEffect(() => {
    if (getAll) getAll();
  }, []);

  useEffect(() => {
    if (changeFilteredTask) changeFilteredTask();
  }, [todos, filterStatus]);

  return (
    <div className="App">
      <div className="wrapper">
        <TodoControls />

        <Todos>
          {filteredTasks
            ? filteredTasks.map((item: TodoType) => (
                <TodoItem item={item} key={item._id} />
              ))
            : ""}
        </Todos>

        <Navigation />
      </div>
    </div>
  );
};
