import React from "react";
import { allTodos } from "../constants";

export const Navigation = ({ changeFilterStatus }) => (
  <div className="navigation">
    <label className="all" onClick={() => changeFilterStatus(allTodos)}>
      <input type="radio" name="progress" />
      <span>All</span>
    </label>

    <label className="in-progress" onClick={() => changeFilterStatus(false)}>
      <input type="radio" name="progress" />
      <span>In Progress</span>
    </label>

    <label className="all-done" onClick={() => changeFilterStatus(true)}>
      <input type="radio" name="progress" />
      <span>Done</span>
    </label>
  </div>
);
