import { BaseSyntheticEvent, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../Context";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const styles = {
  box: {
    "& .MuiTextField-root": { m: 1, width: "25ch" },
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  textField: {
    margin: "0px !important",
    display: "flex",
    alignItems: "center",
    maxWidth: "190px",
  },
  fab: { transform: "rotate(120deg)" },
};

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
    <Box
      component="form"
      sx={styles.box}
      noValidate
      autoComplete="off"
      onChange={(e: BaseSyntheticEvent) => {
        setValue(e.target.value);
      }}
    >
      <TextField
        label="Задание"
        id="outlined-size-small"
        size="small"
        sx={styles.textField}
      />

      <Fab
        size="small"
        color="success"
        aria-label="add"
        onClick={submitHandler}
      >
        <AddIcon />
      </Fab>
      <Fab
        size="small"
        color="error"
        aria-label="add"
        onClick={deleteAll}
        sx={styles.fab}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
