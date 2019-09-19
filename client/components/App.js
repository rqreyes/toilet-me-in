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
    const inputList = document.getElementsByTagName('input');

    for (let input of inputList) {
      input.value = '';
    }

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
    let newQueue = [...this.state.queue];
    newQueue = newQueue.filter(person => person.id !== id);
    this.setState({
      queue: newQueue
    });
    fetch('/bathroom/' + id, { method: 'DELETE' });
  }

  render() {
    return (
      <div className='container'>
        <h1>ToiLet Me In</h1>
        <div className='content'>
          <button className='handle'></button>
          <div className='headers'>
            <h2>Name</h2>
            <h2>Urgency</h2>
            <h2>Remove</h2>
          </div>
          <ol>
            {this.state.queue.map(person => (
              <li key={person.id} id={person.id}>
                <p className='name'>{person.name}</p>
                <p className='urgency'>{person.urgency}</p>
                <button
                  className='remove'
                  onClick={e => this.removePerson(person.id, e)}
                ></button>
              </li>
            ))}
          </ol>
          <div className='headers'>
            <h2>Name</h2>
            <h2>Urgency</h2>
            <h2>Add</h2>
          </div>
          <div className='add-person'>
            <input id='name' type='text' placeholder='Name' ref={this.name} />
            <input
              id='urgency'
              type='text'
              placeholder='Urgency'
              ref={this.urgency}
            />
            <button className='submit' onClick={this.addPerson}></button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
