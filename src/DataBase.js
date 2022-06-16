// const sub = () => {
//     return fetch("/api/todo")
//         .then(response =>  response.json())
//         .then(result => console.log(result))
// }

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
    }

    getOne() {

    }

    update() {

    }

    delete() {

    }

    deleteAll() {

    }
}


export default DataBase