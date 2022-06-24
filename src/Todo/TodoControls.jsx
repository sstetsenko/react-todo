import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context";
import { AddIcon } from "../img/AddIcon";
import { DeleteIcon } from "../img/DeleteIcon";

export const TodoControls = ({ removeAllTasks }) => {
  const [value, setValue] = useState("");

  const { create } = useContext(AppContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (value) {
      create(value);
      setValue("");
    }
  };

  return (
    <form className="add-todo" onSubmit={submitHandler}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn-add" onClick={submitHandler}>
        <AddIcon width="35" height="35" />
      </button>
      <button className="remove-all-todo" onClick={removeAllTasks}>
        <DeleteIcon width="35" height="35" />
      </button>
    </form>
  );
};
