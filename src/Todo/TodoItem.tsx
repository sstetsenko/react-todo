import { BaseSyntheticEvent, useState } from "react";
import { useContext } from "react";
import { EditIcon } from "../img/index";
import { AppContext } from "../Context";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const styles = {
  list: {
    height: "40px",
    marginBottom: "10px",
    padding: 0,
    display: "flex",
  },
  listItem: {
    display: "flex",
    width: "100% !important",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    padding: "5px",
    borderRadius: "5px",
    "& div:first-of-type": {
      display: "flex",
      alignItems: "center",
    },
    "& p": {
      overflowX: "hidden",
      maxWidth: "180px",
    },
  },
  checkBox: {
    "& .MuiSvgIcon-root": { fontSize: 20 },
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  editIcon: { marginRight: "15px" },
  deleteIcon: {
    width: "20px",
    height: "20px",
  },
  inputTask: {
    border: "none",
    color: "#003eb9",
    maxWidth: "180px",
    fontSize: "16px",
  },
};

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
    <List className={done ? "done" : ""} sx={styles.list}>
      <ListItem className="task" sx={styles.listItem}>
        <div>
          <Checkbox
            sx={styles.checkBox}
            checked={done}
            onChange={() => update!(id)}
          />

          {isEditable ? (
            <input
              className="input-task"
              defaultValue={todo}
              onChange={changeText}
              style={styles.inputTask}
            />
          ) : (
            <p onDoubleClick={changeTodoDescription}>{todo}</p>
          )}
        </div>

        <div>
          <IconButton
            className="pen"
            aria-label="edit"
            size="small"
            onClick={clickOnPen}
            sx={styles.editIcon}
          >
            {isEditable && <EditIcon width="25px" height="25px" />}
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteTask!(id)}
            sx={styles.deleteIcon}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      </ListItem>
    </List>
  );
}
