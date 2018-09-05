import React, { Component } from 'react';
import '../styles/index.css';
import SignUpForm from '../components/SignUpForm.js'
import SignInForm from '../components/SignInForm.js'
import ChangePasswordForm from '../components/ChangePasswordForm.js'
import SignOutForm from '../components/SignOutForm.js'
import PostForm from '../components/PostForm.js'
import PostList from '../components/PostList';

class App extends Component {
  constructor (props) {
    super (props) 
    this.state = {
      token: null,
      posts: [],
      // determines which component needs a user message
      // update and delete messages are stored separately in the Post component state
      feedbackComponent: null,
      // stores the user message needed
      feedbackMsg: null
    }
    // Binding 'this' to the App.js allows us to pass these functions down
    // and thus alter App.js state from the child components.
    // Allows information flow upward.
    // Specific statement to bind functions can be avoided by using ES6 arrow functions.
    // (Different default handling of 'this.')
    this.setToken = this.setToken.bind(this)
    this.addPost = this.addPost.bind(this)
    this.setPosts = this.setPosts.bind(this)
    this.feedbackMessage = this.feedbackMessage.bind(this)
    this.updatePost = this.updatePost.bind(this)
  }

  setToken (token) {
    this.setState(prevState => {
      return {token: token}
    })
  } 

  setPosts (postsArray) {
    this.setState({ posts: postsArray })
  }

  addPost (postObj) {
    this.setState(prevState => {
      let nextState = prevState
      nextState.posts.push(postObj)
      return nextState
    })
  }

  updatePost (postIndex, postObj) {
    this.setState (prevState => {
      let nextState = prevState
      nextState.posts[postIndex] = postObj
      return nextState
    })
  }


  // pass feedbackMessage down to components which need a user message
  // each component passes a string of its own name to the function via componentName
  // to tell App state which component needs a message
  // binding this since it uses setState
  // (future version, can the function automatically determine which component calls it?)
  feedbackMessage (message, componentName) {
    this.setState({
      feedbackComponent: componentName,
      feedbackMsg: message
    })
    // sets message back to null after 1 second delay
    setTimeout(() => {
        this.setState({
          feedbackComponent: null,
          feedbackMsg: null
        })
      },
      1000
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* make header its own class eventually */}
          <h1 className="App-title">Journal App</h1>
        </header>
        {/* if the user is not signed in, display sign up and sign in; else change password, sign out, and create post */}
        { ! this.state.token
          ? <div>
              <SignUpForm feedbackMessage={this.feedbackMessage}
              // if the state says sign up component needs a message, pass down the message
                          feedbackMsg={this.state.feedbackComponent === 'SignUpForm' 
                                         ? this.state.feedbackMsg
                                         : null }/>
              <SignInForm setToken={this.setToken} setPosts={this.setPosts} 
                          feedbackMessage={this.feedbackMessage}
                          feedbackMsg={this.state.feedbackComponent === 'SignInForm' 
                                         ? this.state.feedbackMsg
                                         : null }/>
            </div>
          : <div>
              <ChangePasswordForm token={this.state.token}
                                  feedbackMessage={this.feedbackMessage}
                                  feedbackMsg={this.state.feedbackComponent === 'ChangePasswordForm' 
                                                 ? this.state.feedbackMsg
                                                 : null }/> 
              <SignOutForm token={this.state.token} setToken={this.setToken} setPosts={this.setPosts} 
                            feedbackMessage={this.feedbackMessage}
                            feedbackMsg={this.state.feedbackComponent === 'SignOutForm' 
                                           ? this.state.feedbackMsg
                                           : null }/>
              <PostForm token={this.state.token} addPost={this.addPost} />
            </div>
        }
        {/* pass to the postlist all the information needed to create a post
        and to update a post  */}
        <PostList postList={this.state.posts} token={this.state.token}
                  updatePost={this.updatePost}
                  feedbackMessage={this.feedbackMessage}
                  feedbackMsg={this.state.feedbackComponent === 'PostList' 
                                 ? this.state.feedbackMsg
                                 : null }/>
      </div>
    )
  }
}

export default App;
