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
            needsUpdate: false
        }
        this.setNeedsUpdate = this.setNeedsUpdate.bind(this)
    }

    setNeedsUpdate (updateState) {
        this.setState({needsUpdate: updateState})
    }

    deletePost (currProps, event) {
        event.preventDefault()
        
        axios.delete(`${config.apiUrl}/posts/${currProps.post.id}`,
                        {headers: {Authorization: `Token token=${currProps.token}`}})
            .then(res => console.log('deleted and res is ', res))
            .then(this.props.updatePost(this.props.post.stateIndex, null))
            .catch(err => console.log('delete failed and error is ', err))
    }

    render() {  
        return (
            <div className="post">
                <h3>{this.props.post.title}</h3>
                <p>{this.props.post.content}</p>
                {/* when update button form is clicked, set property of needing update to true */}
                <button onClick = {(e) => this.setNeedsUpdate(true, e)}>Update</button>
                <button onClick = {(e) => this.deletePost(this.props, e)}>Delete</button>
                {this.state.needsUpdate ? <UpdatePostForm post={this.props.post} token={this.props.token} updatePost={this.props.updatePost} setNeedsUpdate={this.setNeedsUpdate} /> : null}
            </div>
        )
    }
}

export default Post;