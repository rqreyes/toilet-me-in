import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      flask: []
    };
  }

  componentDidMount() {
    fetch('/api/flask')
      .then(res => res.json())
      .then(flask =>
        this.setState({ flask }, () => console.log('Flask fetched...', flask))
      );
  }

  render() {
    return (
      <div>
        <h1>Task Flask</h1>
        <ul>
          {this.state.flask.map(task => (
            <li key={task.id}>{task.task}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
