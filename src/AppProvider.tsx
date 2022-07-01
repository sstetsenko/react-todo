import { FC, useState } from "react";
import { AppContext } from "./Context";
import { AppProps, ITodo } from "./types";
import { ALL_TODOS } from "./constants";

export const AppProvider: FC<AppProps> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITodo[]>(todos);
  const [filterStatus, setFilterStatus] = useState<string | boolean>(ALL_TODOS);

  const changeFilteredTask = () => {
    if (filterStatus === ALL_TODOS) {
      setFilteredTasks(todos);
    } else {
      const filteredTodo = [...todos].filter(
        (todo) => todo.checked === filterStatus
      );
      setFilteredTasks(filteredTodo);
    }
  };

  const changeFilterStatus = (status: string | boolean) =>
    setFilterStatus(status);

  const getAll = async (): Promise<any> => {
    const response = await fetch("/api/todo");
    const result = await response.json();
    setTodos(result);
  };

  const create = async (title: string) => {
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

  const update = async (id: string, editedText = null, isText = false) => {
    const item = todos.find((task) => task._id === id);

    const updatedItem = {
      ...item,
      title: isText ? editedText : item!.title,
      checked: isText ? item!.checked : !item!.checked,
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

  const deleteTask = async (id: string) => {
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
