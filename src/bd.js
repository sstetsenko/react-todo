const sub = () => {
    return fetch("/api/todo")
        .then(response => {
            return response.json()
        }).then(result => {
            return result.forEach((el, i) => {
                return `<div>${el}</div>`
            });
        })
}


