import React, { SetStateAction } from "react";
import { TodoType } from "./types";

export interface TodoProps {
  todos: TodoType[];
  setTodos: React.Dispatch<SetStateAction<TodoType[]>>;
  create(title: string): void;
  update(id: string, editedText?: null, isText?: boolean): Promise<any>;
  deleteTask(id: string): void;
  deleteAll(): void;
  getAll(): Promise<void>;
  filteredTasks: TodoType[];
  setFilteredTasks: React.Dispatch<SetStateAction<TodoType[]>>;
  filterStatus: boolean | string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string | boolean>>;
  changeFilteredTask(): void;
  changeFilterStatus(status: string | boolean): void;
}

export const AppContext = React.createContext<Partial<TodoProps>>({});
