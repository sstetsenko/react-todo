import React, { BaseSyntheticEvent, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../Context";
import { AddIcon, DeleteIcon } from "../img/index";

export const TodoControls = () => {
  const [value, setValue] = useState("");

  const { create, deleteAll } = useContext(AppContext);

  const submitHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (value) {
      if (create) create(value);
      setValue("");
    }
  };

  return (
    <form className="add-todo">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="btn-add" onClick={submitHandler}>
        <AddIcon width="35" height="35" />
      </button>

      <button className="remove-all-todo" onClick={deleteAll}>
        <DeleteIcon width="35" height="35" />
      </button>
    </form>
  );
};
