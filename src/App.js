import React, { useEffect, useState } from 'react';
import './App.css';
import TodoItem from './Todo/TodoItem';
import AddTodo from './Todo/AddTodo';
import Todos from './Todo/Todos';
import Navigation from './Todo/Navigation';


function App() {

  const [todos, setTodo] = useState([])
  const [filtered, setFiltered] = useState(todos)

  useEffect(() => {
    setFiltered(todos)
  }, [todos])

  const addTask = (title) => {

    setTodo([...todos, {
      id: Date.now(),
      todo: title,
      done: false,
    }]
    )
  }

  const removeAllTasks = (e) => {
    e.preventDefault()
    setTodo(todos.filter(() => { }))
  }

  const removeTask = (id) => {
    setTodo(todos.filter(todo => todo.id !== id))
  }

  const changeCheckbox = (id) => {
    setTodo(todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done
      }
      return todo
    }))
  }

  const filterStatus = (status) => {
    if (status === 'all') {
      setFiltered(todos)
    } else {
      let newTodo = [...todos].filter(todo => todo.done === status)
      setFiltered(newTodo)
    }
  }

  return (
    <div className="App">
      <div className='wrapper'>

        <AddTodo
          todos={todos}
          onCreate={addTask}
          removeAllTasks={removeAllTasks}
        />

        <Todos>

          {filtered.map((item, i) => {
            return <TodoItem
              id={item.id}
              todo={item.todo}
              done={item.done}
              key={i}
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

export default App;