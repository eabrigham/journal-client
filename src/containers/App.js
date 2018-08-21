import React, { Component } from 'react';
import '../styles/App.css';
import SignUpForm from '../components/SignUpForm.js'

class App extends Component {
  constructor (props) {
    super (props) 
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* make header its own class eventually */}
          <h1 className="App-title">Journal App</h1>
        </header>
        <SignUpForm />
      </div>
    );
  }
}

export default App;
