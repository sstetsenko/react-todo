import { useContext, useEffect, FC } from "react";
import "./App.css";
import { TodoItem, TodoControls, Navigation } from "./Todo/index";
import { AppContext } from "./Context";
import { TodoType } from "./types";

import Card from "@mui/material/Container";
import { Container } from "@mui/system";

const styles = {
  app: {
    margin: 0,
    padding: 0,
    'box-sizing': "border-box",
    outline: "none",
    'font-family': "Roboto, sans-serif",
    'text-align': "center",
    backgroundColor: "#0095ff",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: "white",
    width: 330,
    height: 450,
    borderRadius: 5,
    paddingTop: 4,
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
    display: "flex",
    flexDirection: "column",
  },

  card: {
    height: 280,
    marginBottom: 2,
    overflowY: "auto",
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
  },
};

export const App: FC<TodoType> = () => {
  const { todos, getAll, filteredTasks, filterStatus, changeFilteredTask } =
    useContext(AppContext);

  useEffect(() => {
    if (getAll) getAll();
  }, []);

  useEffect(() => {
    if (changeFilteredTask) changeFilteredTask();
  }, [todos, filterStatus]);

  return (
    <div className="App" style={styles.app}>
      <Container sx={styles.container}>
        <TodoControls />

        <Card sx={styles.card}>
          {filteredTasks
            ? filteredTasks.map((item: TodoType) => (
                <TodoItem item={item} key={item._id} />
              ))
            : ""}
        </Card>

        <Navigation />
      </Container>
    </div>
  );
};
