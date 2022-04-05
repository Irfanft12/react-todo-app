import { render } from "@testing-library/react";
import React, { Component } from "react";
import styles from "./TodoItem.module.css";

export default class TodoItem extends Component {
  
  state = {
    editing : false
  }

  componentWillUnmount() {
    console.log("Cleaning up...")
  }

  render() {
    const completedStyle = {
      fontStyle: "italic",
      color: "#595959",
      opacity: 0.4,
      textDecoration: "line-through",
    };
  
    const { id, title, completed } = this.props.todo;
  
    function handleEdit() {
      this.setEditing(true);
    }
  
    let viewMode = {};
    let editMode = {};
  
    if (this.editing) {
      viewMode.display = "none";
    } else {
      editMode.display = "none";
    }
  
    function handleUpdateDone(e) {
      if ( e.key === "Enter" ) {
        this.setEditing(false)
      }
    }

    return (
      <li className={styles.item}>
        <div onDoubleClick={handleEdit}>
          <input
            type="checkbox"
            className={styles.checkbox}
            name=""
            id=""
            checked={completed}
            onChange={() => this.props.handleChangeProps(this.props.todo.id)}
          />
          <button onClick={() => this.props.delTodoProps(id)}>Delete</button>
          <span style={this.props.todo.completed ? completedStyle : null}>
            {title}
          </span>
        </div>
        <input
          type="text"
          className={styles.textInput}
          style={editMode}
          value={title}
          onChange={e => {this.props.setUpdateProps(e.target.value, id)}}
          onKeyDown={handleUpdateDone}
        />
      </li>
    );
  }

  
}
