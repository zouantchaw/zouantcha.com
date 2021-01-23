import React from 'react';
import axios from 'axios';

class App extends React.Component {

  state = {
    title: '',
    body: ''
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    })
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: 'http://localhost:8080/api/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data has been sent to the server');
    })
    .catch(() => {
      console.log('Internal server error')
    })
  }

  render () {

    console.log('State:', this.state)
    //JSX
    return(
      <div>
        <h2>Welcome to my app</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea 
            name="body" 
            placeholder="Body" 
            cols="30" 
            rows="10" 
            value={this.state.body}
            onChange={this.handleChange}>
            </textarea>
          </div>

          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default App;