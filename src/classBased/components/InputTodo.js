import React, { Component } from "react";

export default class InputTodo extends Component {
  state = {
    title: ""
  };

  handleSubmit = (e) => {
    e.preventDefault()
    if ( this.state.title !== "" ) {
        this.props.addTodoItemProp(this.state.title)
        this.setState({title: ""})
    } else {
        alert("Please name the Todo")
    }
    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <input
          type="text"
          className="input-text"
          onChange={(e) => this.setState({[e.target.name]: e.target.value})}
          placeholder="Add Todo..."
          name="title"
          value={this.state.title}
        />
        <button className="input-submit">Submit</button>
      </form>
    );
  }
}
