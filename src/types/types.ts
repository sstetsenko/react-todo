import React from "react";

export interface ITodo {
    _id: string,
    title: string,
    checked: string | boolean,
}

export interface Children {
    children: React.ReactNode | React.ReactElement
}