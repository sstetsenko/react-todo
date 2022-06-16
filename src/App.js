import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoItem } from './Todo/TodoItem';
import { TodoControls } from './Todo/TodoControls';
import { Todos } from './Todo/Todos';
import { Navigation } from './Todo/Navigation';
import DataBase from './DataBase.js';

function App() {
  const [todos, setTodo] = useState([])
  const [filtered, setFiltered] = useState(todos)


  const db = new DataBase()



  useEffect(() => {
    const getAll = async () => {
      const response = await fetch("/api/todo")
      const result = await response.json()
      return setTodo(result)
    }
    getAll()
  }, [])

  useEffect(() => {
    setFiltered(todos)
  }, [todos])

  const addTask = (title) => {
    setTodo([...todos, {
      title: title,
      checked: false,
    }]
    )
  }

  // console.log(db.create(addTask));

  const removeAllTasks = (e) => {
    e.preventDefault()
    setTodo([])
  }

  const removeTask = (_id) => setTodo(todos.filter(todo => todo._id !== _id))

  const changeCheckbox = (_id) => {
    setTodo(todos.map(todo => {
      if (todo._id === _id) {
        todo.checked = !todo.checked
      }
      return todo
    }))
  }

  const filterStatus = (status) => {
    if (status === 'all') {
      setFiltered(todos)
    } else {
      const filteredTodo = [...todos].filter(todo => todo.checked === status)
      setFiltered(filteredTodo)
    }
  }

  return (
    <div className="App">
      <div className='wrapper'>

        <TodoControls
          todos={todos}
          onCreate={addTask}
          removeAllTasks={removeAllTasks}
        />

        <Todos>

          {filtered.map((item) => {
            return <TodoItem
              id={item._id}
              todo={item.title}
              done={item.checked}
              key={item._id}
              removeTask={removeTask}
              changeCheckbox={changeCheckbox}
            />
          })}

        </Todos>

        <Navigation
          todos={todos}
          filterStatus={filterStatus}
        />

      </div>
    </div>
  );
}

export default App