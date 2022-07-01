import React, { SetStateAction } from "react";
import { ITodo } from "./types";

export interface TodoProps {
  todos: ITodo[];
  setTodos: React.Dispatch<SetStateAction<ITodo[]>>;
  create(title: string): Promise<any>;
  update(id: string, editedText?: null, isText?: boolean): Promise<any>;
  deleteTask(id: string): Promise<any>;
  deleteAll(): Promise<any>;
  getAll(): Promise<void>;
  filteredTasks: ITodo[];
  setFilteredTasks: React.Dispatch<SetStateAction<ITodo[]>>;
  filterStatus: boolean | string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string | boolean>>;
  changeFilteredTask(): void;
  changeFilterStatus(status: string | boolean): void;
}

export const AppContext = React.createContext<Partial<TodoProps>>({});

