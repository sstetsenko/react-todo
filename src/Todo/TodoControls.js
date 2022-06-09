import React, { useState } from "react";

export function TodoControls({ onCreate, addTask, removeAllTasks }) {
    const [value, setValue] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        onCreate(value)
    }

    return (
        <form className="add-todo" onSubmit={submitHandler}>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <button className="btn-add" onClick={addTask} />
            <button className="remove-all-todo" onClick={removeAllTasks} />
        </form>
    )
}