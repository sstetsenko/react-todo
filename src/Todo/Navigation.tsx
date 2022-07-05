import { FC, useContext, useState } from "react";
import { ALL_TODOS } from "../constants";
import { AppContext } from "../Context";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const styles = {
  buttonGroup: {
    width: "100%",
    justifyContent: "center",
  },
  toggleButton: {
    padding: "7px !important",
  }
};

export const Navigation: FC  = () => {
  const { changeFilterStatus } = useContext(AppContext);

  const [alignment, setAlignment] = useState("All");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={styles.buttonGroup}
    >
      <ToggleButton
        color="primary"
        value="All"
        onClick={() => changeFilterStatus!(ALL_TODOS)}
        sx={styles.toggleButton}
      >
        All
      </ToggleButton>

      <ToggleButton
        color="warning"
        value="In Progress"
        onClick={() => changeFilterStatus!(false)}
        sx={styles.toggleButton}
      >
        In Progress
      </ToggleButton>

      <ToggleButton
        color="success"
        value="Done"
        onClick={() => changeFilterStatus!(true)}
        sx={styles.toggleButton}
      >
        Done
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
