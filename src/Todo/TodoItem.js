import React from "react";

function TodoItem(props) {

    const classes = []

    if (props.done) {
        classes.push('done')
    }

    return (
        <div className={classes.join()}>
            <div className="task" id={props.id} checked={props.done}>
                <span>
                    <input type="checkbox" checked={props.done} onClick={() => props.changeCheckbox(props.id)} />
                    &nbsp;
                    <p>{props.todo}</p>
                </span>
                <button className="remove-task" onClick={() => props.removeTask(props.id)}>&times;</button>
            </div>
        </div>
    )
}


export default TodoItem
