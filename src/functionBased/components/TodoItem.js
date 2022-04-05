import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

export default function TodoItem(props) {
  const [editing, setEditing] = useState(false);

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { id, title, completed } = props.todo;

  function handleEdit() {
    setEditing(true);
  }

  let viewMode = {};
  let editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  function handleUpdateDone(e) {
    if (e.key === "Enter") {
      setEditing(false);
    }
  }

  useEffect(() => {
    console.log("cleaning up...");
  }, []);

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEdit}>
        <input
          type="checkbox"
          className={styles.checkbox}
          name=""
          id=""
          checked={completed}
          onChange={() => props.handleChangeProps(props.todo.id)}
        />
        <button onClick={() => props.delTodoProps(id)}>
          <FaTrash style={{color: "orangered", fontSize: "16px", }} />
        </button>
        <span style={props.todo.completed ? completedStyle : null}>
          {title}
        </span>
      </div>
      <input
        type="text"
        className={styles.textInput}
        style={editMode}
        value={title}
        onChange={(e) => {
          props.setUpdateProps(e.target.value, id);
        }}
        onKeyDown={handleUpdateDone}
      />
    </li>
  );
}
