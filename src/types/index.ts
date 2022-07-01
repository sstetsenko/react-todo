import React from "react";

export interface ITodo {
  _id?: string;
  title?: string;
  checked?: string | boolean;
}

export interface AppProps {
  children: React.ReactNode | React.ReactElement;
}
