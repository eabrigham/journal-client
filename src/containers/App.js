import React, { Component } from 'react';
import '../styles/App.css';
import SignUpForm from '../components/SignUpForm.js'
import SignInForm from '../components/SignInForm.js'
import PostForm from '../components/PostForm.js'

class App extends Component {
  constructor (props) {
    super (props) 
    this.state = {
      token: null
    }
    this.setToken = this.setToken.bind(this)
  }

  setToken (token) {
    this.setState(prevState => {
      return {token: token}
    })
    console.log('In App.js and the state token is ', this.state.token)
  } 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* make header its own class eventually */}
          <h1 className="App-title">Journal App</h1>
        </header>
        <SignUpForm />
        <SignInForm setToken={this.setToken} />
        <PostForm token={this.token}/>
      </div>
    )
  }
}

export default App;
