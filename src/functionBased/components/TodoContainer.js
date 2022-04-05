import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";

export default function TodoContainer() {
  const [ todos, setTodos ] = useState(getInitialTodos())

const handleChange = (id) => {
    setTodos((prevState) => 
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    );
  };

const delTodo = (id) => {
    setTodos([
          ...todos.filter(todo => {
              return todo.id !== id
          })
      ])
  };

const  addTodoItem = (title) => {
      const newTodo = {
          id: uuidv4(),
          title: title,
          completed: false
      }
    setTodos([...todos, newTodo])
  }

const setUpdate = (updateTitle, id) => {
    setTodos({
      todos: todos.map(todo => {
        if ( todo.id === id ) {
          todo.title = updateTitle
        }
        return todo
      })
    })
  }

  console.log("common")

  function getInitialTodos() {
    console.log("Get stored data")

    // getting stored items
    const temp = localStorage.getItem("todos")
    const savedTodos = JSON.parse(temp)
    return savedTodos || []
  }

  useEffect(() => {

    console.log("store data")

    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

    return (
        <div className="container" >
            <div className="inner">
              <Header />
              <InputTodo addTodoItemProp={addTodoItem} />
              <TodoList
                todos={todos}
                handleChangeProps={handleChange}
                delTodoProps={delTodo}
                setUpdateProps={setUpdate}
              />
            </div>
          </div>
    );
}
