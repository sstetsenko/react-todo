import { BaseSyntheticEvent, useState } from "react";
import { useContext } from "react";
import { EditIcon } from "../img/index";
import { AppContext } from "../Context";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  list: {
    height: "40px",
    marginBottom: "10px !important",
    padding: "0 !important",
    display: "flex",
  },
  listItem: {
    display: "flex !important",
    width: "100% !important",
    justifyContent: "space-between !important",
    border: "1px solid #ccc",
    padding: "5px",
    borderRadius: "5px",
    "& div:first-of-type": {
      display: "flex !important",
      alignItems: "center !important",
    },
    "& p": {
      overflowX: "hidden !important",
      maxWidth: "180px !important",
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
});

export function TodoItem({ item }: any) {
  const { update, deleteTask } = useContext(AppContext);

  const { title: todo, checked: done, _id: id } = item;

  const [isEditable, setIsEditable] = useState(false);
  const [editedText, setEditedText] = useState(todo);

  const classes = useStyles();

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
    <List className={done ? `done ${classes.list}` : `"" ${classes.list}`}>
      <ListItem className={classes.listItem}>
        <div>
          <Checkbox
            className={classes.checkBox}
            checked={done}
            onChange={() => update!(id)}
          />

          {isEditable ? (
            <input
              className={classes.inputTask}
              defaultValue={todo}
              onChange={changeText}
            />
          ) : (
            <p onDoubleClick={changeTodoDescription}>{todo}</p>
          )}
        </div>

        <div>
          <IconButton
            className={classes.editIcon}
            aria-label="edit"
            size="small"
            onClick={clickOnPen}
          >
            {isEditable && <EditIcon width="25px" height="25px" />}
          </IconButton>

          <IconButton
            aria-label={classes.deleteIcon}
            size="small"
            onClick={() => deleteTask!(id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      </ListItem>
    </List>
  );
}
