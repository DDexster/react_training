import React, { Component } from 'react';
import TaskEditor from './components/TaskEditor';
import TaskFilter from './components/TaskFilter';
import TaskContainer from './components/TaskContainer';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="todo-app">
        <TaskEditor />
        <TaskFilter />
        <TaskContainer />
      </div>
    );
  }
}

export default App;
