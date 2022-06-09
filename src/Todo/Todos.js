import React from "react";

function Todos(props) {
    return (
        <div className="list-todos">
            {props.children}
        </div>
    )
}

export default Todos