import React, { Component } from "react";

export const AppContext = React.createContext();

export class AppProvider extends Component {
  create = async (item) => {
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    return result;
  };

  update = async (item) => {
    const response = await fetch(`/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    return result;
  };

  deleteTask = async (id) => {
    const response = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const result = await response.json();
    return result;
  };

  deleteAll = async () => {
    const response = await fetch("/api/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const result = await response.json();
    return result;
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          create: this.create,
          update: this.update,
          deleteTask: this.deleteTask,
          deleteAll: this.deleteAll,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const withAppContext = (WrappedComponent) => (props) =>
  (
    <AppContext.Consumer>
      {(contextValue) => {
        return <WrappedComponent {...props} appContext={contextValue} />;
      }}
    </AppContext.Consumer>
  );
