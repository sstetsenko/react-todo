import { useContext } from "react";
import { ALL_TODOS } from "../constants";
import { AppContext } from "../Context";

export const Navigation = () => {
  const { changeFilterStatus } = useContext(AppContext);

  return (
    <div className="navigation">
      <label className="all" onClick={() => changeFilterStatus!(ALL_TODOS)}>
        <input type="radio" name="progress" />
        <span>All</span>
      </label>

      <label className="in-progress" onClick={() => changeFilterStatus!(false)}>
        <input type="radio" name="progress" />
        <span>In Progress</span>
      </label>

      <label className="all-done" onClick={() => changeFilterStatus!(true)}>
        <input type="radio" name="progress" />
        <span>Done</span>
      </label>
    </div>
  );
};
