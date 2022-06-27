import React, { useState } from "react";
import { allTodos } from "./constants";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(todos);
  const [filterStatus, setFilterStatus] = useState(allTodos);

  const changeFilteredTask = () => {
    if (filterStatus === allTodos) {
      setFilteredTasks(todos);
    } else {
      const filteredTodo = [...todos].filter(
        (todo) => todo.checked === filterStatus
      );
      setFilteredTasks(filteredTodo);
    }
  };

  const changeFilterStatus = (status) => {
    setFilterStatus(status);
  };

  const getAll = async () => {
    const response = await fetch("/api/todo");
    const result = await response.json();
    setTodos(result);
  };

  const create = async (title) => {
    const item = {
      title,
      checked: false,
    };

    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(item),
    });

    const result = await response.json();

    setTodos([...todos, result]);
  };

  const update = async (id, editedText = null, isText = false) => {
    const item = todos.find((task) => task._id === id);

    const updatedItem = {
      ...item,
      title: isText ? editedText : item.title,
      checked: isText ? item.checked : !item.checked,
    };

    const response = await fetch(`/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(updatedItem),
    });

    const result = await response.json();

    setTodos(
      todos.map((todo) => {
        let task = { ...todo };
        if (task._id === id) {
          task = { ...result };
        }
        return task;
      })
    );
  };

  const deleteTask = async (id) => {
    const response = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const result = await response.json();

    if (result) {
      setTodos(todos.filter((todo) => todo._id !== id));
    }
  };

  const deleteAll = async () => {
    const response = await fetch("/api/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const result = await response.json();

    if (result.deletedCount > 0) {
      setTodos([]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        setTodos,
        todos,
        create,
        update,
        deleteTask,
        deleteAll,
        getAll,
        filteredTasks,
        setFilteredTasks,
        filterStatus,
        setFilterStatus,
        changeFilteredTask,
        changeFilterStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
