import React from "react";

export const Todos = (props) => {
    return (
        <div className="list-todos">
            {props.children}
        </div>
    )
}

