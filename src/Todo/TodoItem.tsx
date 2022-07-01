import { BaseSyntheticEvent, useState } from "react";
import { useContext } from "react";
import { DeleteIcon } from "../img/DeleteIcon";
import { EditIcon } from "../img/index";
import { AppContext } from "../Context";

export function TodoItem({ item }: any) {
  const { update, deleteTask } = useContext(AppContext);

  const { title: todo, checked: done, _id: id } = item;

  const [isEditable, setIsEditable] = useState(false);
  const [editedText, setEditedText] = useState(todo);

  const changeTodoDescription = () => {
    setIsEditable(true);
  };

  const clickOnPen = (e: BaseSyntheticEvent) => {
    if (e.target.className.baseVal === "pen-img") {
      if (update) update(id, editedText, true);
      setIsEditable(false);
    }
  };

  const changeText = (e: BaseSyntheticEvent) => {
    setEditedText(e.target.value);
  };

  return (
    <div className={done ? "done" : ""}>
      <div className="task">
        <div>
          <input type="checkbox" checked={done} onChange={() => update!(id)} />

          {isEditable ? (
            <input
              className="input-task"
              defaultValue={todo}
              onChange={changeText}
            />
          ) : (
            <p onDoubleClick={changeTodoDescription}>{todo}</p>
          )}
        </div>

        <div>
          <span className="pen" onClick={clickOnPen}>
            {isEditable && <EditIcon width="25px" height="25px" />}
          </span>

          <button className="remove-task" onClick={() => deleteTask!(id)}>
            <DeleteIcon width="20" height="20" />
          </button>
        </div>
      </div>
    </div>
  );
}
