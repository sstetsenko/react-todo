import React from "react";

export function TodoItem(props) {

    return (
        <div className={props.done ? 'done' : ''}>
            <div className="task" id={props.id} checked={props.done}>
                <span>
                    <input type="checkbox" checked={props.done} onClick={() => props.changeCheckbox(props.id)} />

                    <p>{props.todo}</p>
                </span>
                <button className="remove-task" onClick={() => props.removeTask(props.id)}>&times;</button>
            </div>
        </div>
    )
}