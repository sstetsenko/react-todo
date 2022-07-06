import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { AppProvider } from "./AppProvider";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root") as HTMLElement
);