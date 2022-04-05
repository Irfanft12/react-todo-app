import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa"

export default function InputTodo(props) {
  const [ inputText, setInputText ] = useState({
    title: ""
  });

  function handleChange(e) {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (inputText.title.trim()) {
      props.addTodoItemProp(inputText.title)
      setInputText({
        title: ""
      })
    } else {
      alert("Please add name")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        onChange={handleChange}
        name="title"
        value={inputText.title}
        placeholder="Add Todo..."
      />
      <button className="input-submit"><FaPlusCircle /></button>
    </form>
  );
}
