import React from "react";

export interface TodoType {
  _id?: string;
  title?: string;
  checked?: string | boolean;
}

export interface AppProps {
  children: React.ReactNode | React.ReactElement;
}

export interface IconProps {
  width: string;
  height: string;
}