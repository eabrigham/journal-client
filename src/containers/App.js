import React, { Component } from 'react';
import '../styles/App.css';
import SignUpForm from '../components/SignUpForm.js'
import SignInForm from '../components/SignInForm.js'
import SignOutForm from '../components/SignOutForm.js'
import PostForm from '../components/PostForm.js'
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
    this.setPosts = this.setPosts.bind(this)
  }

  setToken (token) {
    this.setState(prevState => {
      return {token: token}
    })
    console.log('In App.js and the state token is ', this.state.token)
  } 

  setPosts (postsArray) {
    console.log(postsArray)
    this.setState(() => {
      return { posts: postsArray }
    })
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

  // make a generic form submit button
  // formSubmit = e => {
  //   console.log('form submit ran')
  //   e.preventDefault()
  //   console.log(e.target)
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* make header its own class eventually */}
          <h1 className="App-title">Journal App</h1>
        </header>
        {/* <button type="submit" onSubmit={this.formSubmit}>Sign Up</button> */}
        <SignUpForm />
        <SignInForm setToken={this.setToken} setPosts={this.setPosts} />
        <SignOutForm token={this.state.token} setToken={this.setToken} setPosts={this.setPosts} />
        <PostForm token={this.state.token} addPost={this.addPost}/>
        {/* <Post post={this.state.posts[0]} /> */}
        <PostList postList={this.state.posts} />
      </div>
    )
  }
}

export default App;
