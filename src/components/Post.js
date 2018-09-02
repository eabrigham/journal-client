import React, { Component } from 'react';
import '../styles/Post.css'
import UpdatePostForm from './UpdatePostForm.js'
import axios from 'axios'
import config from '../config.js'

// stateful post to allow each post to have update form
// however breaks the 'all state in top container' pattern
class Post extends Component {
    
    constructor (props) {
        super (props)
        this.state = {
            needsUpdate: false,
            postMessage: null
        }
        this.setNeedsUpdate = this.setNeedsUpdate.bind(this)
        this.setPostMessage = this.setPostMessage.bind(this)
    }

    setNeedsUpdate (updateState) {
        this.setState({needsUpdate: updateState})
    }

    setPostMessage (newMessage) {
        this.setState({postMessage: newMessage})
        setTimeout(() => {
            this.setState({ postMessage: null })
          },
          1000
        )
    }

    deletePost (currProps, event) {
        event.preventDefault()
        
        axios.delete(`${config.apiUrl}/posts/${currProps.post.id}`,
                        {headers: {Authorization: `Token token=${currProps.token}`}})
            .then(res => {
                console.log('deleted and res is ', res)
                setTimeout(() => {
                    this.props.updatePost(this.props.post.stateIndex, null)
                  },
                  1000
                )
                this.setPostMessage('Post successfully deleted')
            })
            .catch(err => {
                console.log('delete failed and error is ', err)
                this.setPostMessage('Delete post failed')
            })
    }

    render() {  
        return (
            <div className="post">
                <h3>{this.props.post.title}</h3>
                <p>{this.props.post.content}</p>
                {/* When update button form is clicked, set property of needing update to true */}
                <button onClick = {(e) => this.setNeedsUpdate(true, e)}>Update</button>
                <button onClick = {(e) => this.deletePost(this.props, e)}>Delete</button>
                {/* If post needs update, UpdatePostForm is rendered and passed props
                    including to allow user messaging on the post. */}
                {this.state.needsUpdate 
                        ? <UpdatePostForm post={this.props.post} token={this.props.token} updatePost={this.props.updatePost} setNeedsUpdate={this.setNeedsUpdate} setPostMessage={this.setPostMessage} /> 
                        : null}
                <p>{this.state.postMessage}</p>
            </div>
        )
    }
}

export default Post;