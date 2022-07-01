import { FC } from "react";
import { AppProps } from "../types";

export const Todos: FC<AppProps> = ({ children }) => (
  <div className="list-todos">{children}</div>
);
