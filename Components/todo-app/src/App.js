import React, { Component } from 'react';
import TaskEditor from './components/TaskEditor';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="todo-app">
        <TaskEditor />
      </div>
    );
  }
}

export default App;
