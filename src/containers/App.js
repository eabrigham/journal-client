import React, { Component } from 'react';
import '../styles/App.css';
import SignUpForm from '../components/SignUpForm.js'
import SignInForm from '../components/SignInForm.js'
import PostForm from '../components/PostForm.js'
import Post from '../components/Post.js'
import PostList from '../components/PostList';

class App extends Component {
  constructor (props) {
    super (props) 
    this.state = {
      token: null,
      posts: []
    }
    this.setToken = this.setToken.bind(this)
    this.addPost = this.addPost.bind(this)
  }

  setToken (token) {
    this.setState(prevState => {
      return {token: token}
    })
    console.log('In App.js and the state token is ', this.state.token)
  } 

  addPost (postObj) {
    this.setState(prevState => {
      let nextState = prevState
      nextState.posts.push(postObj)
      return nextState
    })
    
  }

  // to show just sign out/cp when signed in:
  // use a ternary operator
  // have an array of the components that should be listed

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* make header its own class eventually */}
          <h1 className="App-title">Journal App</h1>
        </header>
        <SignUpForm />
        <SignInForm setToken={this.setToken} />
        <PostForm token={this.state.token} addPost={this.addPost}/>
        {/* <Post post={this.state.posts[0]} /> */}
        <PostList postList={this.state.posts} />
      </div>
    )
  }
}

export default App;
