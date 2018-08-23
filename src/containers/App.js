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
      feedbackComponent: null,
      feedbackMsg: null
    }
    this.setToken = this.setToken.bind(this)
    this.addPost = this.addPost.bind(this)
    this.setPosts = this.setPosts.bind(this)
    this.feedbackMessage = this.feedbackMessage.bind(this)
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

  // passing this thing down to forms that need to trigger messages
  // binding this since it uses setState
  feedbackMessage (message, componentName) {
    console.log('feedbackMessage ran')
    this.setState({
      feedbackComponent: componentName,
      feedbackMsg: message
    })
    // write something to make it wait for 5 seconds
    setTimeout(() => {
        this.setState({
          feedbackComponent: null,
          feedbackMsg: null
        })
      },
      5000
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* make header its own class eventually */}
          <h1 className="App-title">Journal App</h1>
        </header>
        { ! this.state.token
          ? <div>
              <SignUpForm feedbackMessage={this.feedbackMessage}
                          feedbackMsg={this.state.feedbackComponent === 'SignUpForm' 
                                         ? this.state.feedbackMsg
                                         : null }/>
              <SignInForm setToken={this.setToken} setPosts={this.setPosts} />
            </div>
          : <div>
              <ChangePasswordForm token={this.state.token} />
              <SignOutForm token={this.state.token} setToken={this.setToken} setPosts={this.setPosts} />
              <PostForm token={this.state.token} addPost={this.addPost}/>
            </div>
        }      
        <PostList postList={this.state.posts} />
      </div>
    )
  }
}

export default App;
