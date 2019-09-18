import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      queue: []
    };
    this.getQueue = this.getQueue.bind(this);
    this.removePerson = this.removePerson.bind(this);
  }

  componentDidMount() {
    this.getQueue();
  }

  getQueue() {
    fetch('/bathroom')
      .then(res => res.json())
      .then(queue =>
        this.setState({ queue }, () => console.log('Fetched queue', queue))
      );
  }

  removePerson(id) {
    this.setState({
      queue: this.state.queue.filter(person => person.id !== id)
    });
    fetch('/bathroom/' + id, { method: 'DELETE' });
  }

  render() {
    return (
      <div>
        <h1>ToiLet Me In</h1>
        <ol>
          {this.state.queue.map(person => (
            <li key={person.id} id={person.id}>
              <p>{person.name}</p>
              <p>{person.urgency}</p>
              <button onClick={e => this.removePerson(person.id, e)}>
                Remove
              </button>
            </li>
          ))}
        </ol>
        <div className='add-person'>
          <label htmlFor='name'>Name</label>
          <input id='name' type='text' />
          <label htmlFor='urgency'>Urgency</label>
          <input id='urgency' type='text' />
          <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
