import React, { useState } from "react";

export function TodoItem({ todo, done, id, removeTask, changeCheckbox }) {
    const [isEditable, setIsEditable] = useState(false)

    const changeTodoDescription = (e) => {
        setIsEditable(true)
        console.log(e);
    }

    const changeContentEditable = (e) => {
        if (e.code === 'Enter') {
            setIsEditable(false)
        }
    }

    return (
        <div className={done ? 'done' : ''}>
            <div className="task" checked={done}>
                <span>
                    <input type="checkbox"
                        checked={done}
                        onChange={() => changeCheckbox(id)}
                    />

                    <p onKeyDown={changeContentEditable}
                        onDoubleClick={changeTodoDescription}
                        contentEditable={isEditable}
                    >
                        {todo}
                    </p>
                </span>
                <button className="remove-task" onClick={() => removeTask(id)}>&times;</button>
            </div>
        </div>
    )
}