import { useContext, useEffect, FC } from "react";
import "./App.css";
import { TodoItem, TodoControls, Navigation } from "./Todo/index";
import { AppContext } from "./Context";
import { TodoType } from "./types";

import { Container, Card, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  app: {
    margin: 0,
    padding: 0,
    "box-sizing": "border-box",
    outline: "none",
    "font-family": "Roboto, sans-serif",
    "text-align": "center",
    backgroundColor: "#0095ff",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: "white",
    maxWidth: "330px",
    height: "450px",
    borderRadius: 5,
    padding: "25px 20px !important",
    display: "flex",
    flexDirection: "column",
  },

  card: {
    height: 280,
    marginBottom: "10px",
    overflow: "auto !important",
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
    boxShadow: "none !important",
  },
});
export const App: FC<TodoType> = () => {
  const classes = useStyles();

  const { todos, getAll, filteredTasks, filterStatus, changeFilteredTask } =
    useContext(AppContext);

  useEffect(() => {
    if (getAll) getAll();
  }, []);

  useEffect(() => {
    if (changeFilteredTask) changeFilteredTask();
  }, [todos, filterStatus]);

  return (
    <Box className={classes.app}>
      <Container className={classes.container}>
        <TodoControls />

        <Card className={classes.card}>
          {filteredTasks
            ? filteredTasks.map((item: TodoType) => (
                <TodoItem item={item} key={item._id} />
              ))
            : ""}
        </Card>

        <Navigation />
      </Container>
    </Box>
  );
};
