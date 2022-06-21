import React, { useState } from "react";
import { DeleteIcon } from "../img/DeleteIcon";
import { EditIcon } from "../img/EditIcon";

export function TodoItem({
  item,
  removeTask,
  changeCheckbox,
  handleRenameTodo,
}) {
  const { title: todo, checked: done, _id: id } = item;

  const [isEditable, setIsEditable] = useState(false);
  const [editedText, setEditedText] = useState(todo);


  const changeTodoDescription = () => {
    setIsEditable(true);
  };

  const clickOnPen = (e) => {
    if (e.target.className.baseVal === "pen-img") {
      handleRenameTodo(id, editedText);
      setIsEditable(false);
    }
  };

  const changeText = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div className={done ? "done" : ""}>
      <div className="task" checked={done}>
        <div>
          <input
            type="checkbox"
            checked={done}
            onChange={() => changeCheckbox(id)}
          />

          {isEditable ? (
            <input
              className="input-task"
              defaultValue={todo}
              onChange={changeText}
            />
          ) : (
            <p
              onDoubleClick={changeTodoDescription}
            >
              {todo}
            </p>
          )}
        </div>
        <div>
          <span className="pen" onClick={clickOnPen}>
            {isEditable && <EditIcon width="25px" height="25px" />}
          </span>
          <button className="remove-task" onClick={() => removeTask(id)}>
            <DeleteIcon width="20" heigh="20" />
          </button>
        </div>
      </div>
    </div>
  );
}
