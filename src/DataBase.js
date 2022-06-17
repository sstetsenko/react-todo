import React from "react"

class DataBase extends React.Component {

    create = async (item) => {
        const response = await fetch("/api/todo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        })
        const result = await response.json();
        return result
    }

    update = async (item) => {
        const response = await fetch(`/api/todo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        })
        const result = await response.json();
        return result
    }

    delete = async (id) => {
        const response = await fetch(`/api/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        const result = await response.json()
        return result
    }

    deleteAll = async () => {
        await fetch('/api/todo', {
            method: 'DELETE',
        })
    }
}


export default DataBase