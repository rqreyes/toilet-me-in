import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      queue: []
    };
    this.getQueue = this.getQueue.bind(this);
    this.name = React.createRef();
    this.urgency = React.createRef();
    this.addPerson = this.addPerson.bind(this);
    this.removePerson = this.removePerson.bind(this);
  }

  componentDidMount() {
    this.getQueue();
  }

  getQueue() {
    fetch('/bathroom')
      .then(res => res.json())
      .then(queue => {
        this.setState({ queue }, () => console.log('Fetched queue', queue));
      });
  }

  addPerson() {
    const nameInput = this.name.current.value;
    const urgencyInput = this.urgency.current.value;

    fetch('/bathroom', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name: nameInput, urgency: urgencyInput })
    })
      .then(res => res.json())
      .then(newQueue => {
        this.setState({ queue: newQueue }, () =>
          console.log('Added person', newQueue)
        );
      });
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
              <button
                type='submit'
                onClick={e => this.removePerson(person.id, e)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
        <div className='add-person'>
          <label htmlFor='name'>Name</label>
          <input id='name' type='text' ref={this.name} />
          <label htmlFor='urgency'>Urgency</label>
          <input id='urgency' type='text' ref={this.urgency} />
          <button type='submit' onClick={this.addPerson}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default App;
