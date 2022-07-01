import React, { SetStateAction } from "react";
import { ITodo } from "./types";

export interface TodoProps {
  todos: ITodo[];
  setTodos: React.Dispatch<SetStateAction<ITodo[]>>;
  create(title: string): void;
  update(id: string, editedText?: null, isText?: boolean): Promise<any>;
  deleteTask(id: string): void;
  deleteAll(): void;
  getAll(): Promise<void>;
  filteredTasks: ITodo[];
  setFilteredTasks: React.Dispatch<SetStateAction<ITodo[]>>;
  filterStatus: boolean | string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string | boolean>>;
  changeFilteredTask(): void;
  changeFilterStatus(status: string | boolean): void;
}

export const AppContext = React.createContext<Partial<TodoProps>>({});
