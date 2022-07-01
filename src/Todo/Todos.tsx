import React, {FC} from "react";
import {Children} from "../types/types";

export const Todos: FC<Children> = ({children}) => (
    <div className="list-todos">{children}</div>
);
