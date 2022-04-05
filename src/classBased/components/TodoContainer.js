import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid"
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";

export default class TodoContainer extends Component {
  state = {
    todos: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todo !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }

  componentDidMount() {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }

  handleChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  delTodo = (id) => {
    this.setState({
        todos: [
            ...this.state.todos.filter(todo => {
                return todo.id !== id
            })
        ]
    })
  };

  addTodoItem = (title) => {
      const newTodo = {
          id: uuidv4(),
          title: title,
          completed: false
      }
    this.setState({
        todos: [...this.state.todos, newTodo]
    })
  }

  setUpdate = (updateTitle, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if ( todo.id === id ) {
          todo.title = updateTitle
        }
        return todo
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoItemProp={this.addTodoItem} />
          <TodoList
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            delTodoProps={this.delTodo}
            setUpdateProps={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}
