import React, { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import DataBase from "../DataBase";

const db = new DataBase()

export function TodoItem({ todo, done, id, removeTask, changeCheckbox, handleRenameTodo }) {
    const [isEditable, setIsEditable] = useState(false);
    const [editedText, setEditedText] = useState("");

    const changeTodoDescription = (e) => {
        setIsEditable(true)
    }

    const changeContentEditable = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault()
            handleRenameTodo(id, editedText)
            setIsEditable(false)
        }
    }

    const changeText = (e) => {
        setEditedText(e.target.textContent);
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
                        suppressContentEditableWarning={true}
                        onInput={changeText}
                    >
                        {todo}
                    </p>


                    {/* {isText ? (
                        <p>
                            texxt
                        </p>
                    ) : (
                        <input value={editedText}/>
                    )} */}
                </span>
                <button className="remove-task" onClick={() => removeTask(id)}>&times;</button>
            </div>
        </div>
    )
}