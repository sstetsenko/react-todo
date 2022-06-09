import React, { useState } from "react";

function AddTodo(props) {

    const [value, setValue] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        props.onCreate(value)
    }

    return (
        <form className="add-todo" onSubmit={submitHandler}>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <button className="btn-add" onClick={props.addTask} />
            <button className="remove-all-todo" onClick={props.removeAllTasks} />
        </form>
    )
}

export default AddTodo