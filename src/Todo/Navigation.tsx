import { FC, useContext, useState } from "react";
import { ALL_TODOS } from "../constants";
import { AppContext } from "../Context";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  buttonGroup: {
    width: "100%",
    justifyContent: "center",
  },
  toggleButton: {
    padding: "7px !important",
  },
})

export const Navigation: FC = () => {
  const { changeFilterStatus, filterStatus, changeFilteredTask } =
    useContext(AppContext);

  const classes = useStyles()

  return (
    <ToggleButtonGroup
      value={filterStatus}
      exclusive
      onChange={changeFilteredTask}
      className={classes.buttonGroup}
    >
      <ToggleButton
        color="primary"
        value="All"
        onClick={() => changeFilterStatus!(ALL_TODOS)}
        className={classes.toggleButton}
      >
        All
      </ToggleButton>

      <ToggleButton
        color="warning"
        value="In Progress"
        onClick={() => changeFilterStatus!(false)}
        className={classes.toggleButton}
      >
        In Progress
      </ToggleButton>

      <ToggleButton
        color="success"
        value="Done"
        onClick={() => changeFilterStatus!(true)}
        className={classes.toggleButton}
      >
        Done
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
