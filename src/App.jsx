import React, { useEffect, useState } from "react";
import "./App.css";
import { TodoItem } from "./Todo/TodoItem";
import { TodoControls } from "./Todo/TodoControls";
import { Todos } from "./Todo/Todos";
import { Navigation } from "./Todo/Navigation";
import DataBase from "./DataBase.js";

function App() {
  const [todos, setTodo] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(todos);

  const db = new DataBase();

  useEffect(() => {
    const getAll = async () => {
      const response = await fetch("/api/todo");
      const result = await response.json();
      setTodo(result);
    };
    getAll();
  }, []);

  useEffect(() => {
    setFilteredTasks(todos);
  }, [todos]);

  const addTask = async (title) => {
    const item = {
      title,
      checked: false,
    };
    const result = await db.create(item);
    setTodo([...todos, result]);
  };

  const removeAllTasks = async (e) => {
    e.preventDefault();
    const result = await db.deleteAll();
    if (result.deletedCount > 0) {
      setTodo([]);
    }
  };

  const removeTask = async (_id) => {
    const result = await db.delete(_id);
    if (result.deletedCount > 0) {
      setTodo(todos.filter((todo) => todo._id !== _id));
    }
  };

  const changeCheckbox = async (_id) => {
    const item = todos.find((task) => task._id === _id);
    const updatedItem = {
      ...item,
      checked: !item.checked,
    };

    const result = await db.update(updatedItem);

    setTodo(
      todos.map((todo) => {
        let task = { ...todo };
        if (todo._id === _id) {
          return {
            ...task,
            checked: result.checked,
          };
        }
        return todo;
      })
    );
  };

  const changeFilterStatus = (status) => {
    if (status === "all") {
      setFilteredTasks(todos);
    } else {
      const filteredTodo = [...todos].filter((todo) => todo.checked === status);
      setFilteredTasks(filteredTodo);
    }
  };

  const handleRenameTodo = async (id, editedText) => {
    const item = todos.find((task) => task._id === id);

    const updatedItem = {
      ...item,
      title: editedText,
    };

    const result = await db.update(updatedItem);
    setTodo(
      todos.map((todo) => {
        let task = { ...todo };
        if (task._id === id) {
          task = { ...result };
        }
        return task;
      })
    );
  };

  return (
    <div className="App">
      <div className="wrapper">
        <TodoControls
          todos={todos}
          onCreate={addTask}
          removeAllTasks={removeAllTasks}
        />

        <Todos>
          {filteredTasks.map((item) => (
            <TodoItem
              handleRenameTodo={handleRenameTodo}
              item={item}
              key={item._id}
              removeTask={removeTask}
              changeCheckbox={changeCheckbox}
            />
          ))}
        </Todos>

        <Navigation changeFilterStatus={changeFilterStatus} />
      </div>
    </div>
  );
}

export default App;
