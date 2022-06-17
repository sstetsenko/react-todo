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

  // Добавляет новое задание и загружает в БД
  const addTask = async (title) => {
    const item = {
      title,
      checked: false
    }
    const result = await db.create(item);
    setTodo([...todos, result])

  }

  const removeAllTasks = async (e) => {
    e.preventDefault()
    // TODO we should clean todo state AFTER request is done
    await db.deleteAll()
    setTodo([])
  }

  const removeTask = async (_id) => {
    // TODO we should setTodo todo state AFTER request is done
    await db.delete(_id)
    return setTodo(todos.filter(todo => todo._id !== _id))
  }


  const changeCheckbox = async (_id) => {
    // Ищет туду по id и сохраняет в item
    const item = todos.find(task => task._id === _id);
    // Разварачивает item в новый объект и меняет нужно значение
    const updatedItem = {
      ...item,
      checked: !item.checked
    }

    const result = await db.update(updatedItem);

    // TODO
    // option with async / await
    // try {
    //   const result = await db.update(updatedItem);
    // } catch (error) {
    //   console.log('errror')
    // }


    // // option with promise chain
    // db.update(updatedItem).then(() => {
    //   setTodo()
    // }).catch(err => {
    //   console.log('error')
    // })


    setTodo(todos.map(todo => {
      // let task = { ...todo };
      if (todo._id === _id) {
        return {
          ...task,
          checked: result.checked
        }
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

  const handleRenameTodo = async (id, editedText) => {
    const item = todos.find(task => task._id === id);

    const updatedItem = {
      ...item,
      title: editedText
    }

    const result = await db.update(updatedItem);
    setTodo(todos.map(todo => {
      let task = { ...todo };
      if (task._id === id) {
        task = { ...result }
      }
      return task
    }))
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

          {filtered.map((item) => (
            <TodoItem
              handleRenameTodo={handleRenameTodo}
              id={item._id}
              todo={item.title}
              done={item.checked}
              key={item._id}
              removeTask={removeTask}
              changeCheckbox={changeCheckbox}
            />
          ))}

        </Todos>

        <Navigation
          todos={todos}
          filterStatus={filterStatus}
        />

      </div>
    </div>
  )
}

export default App