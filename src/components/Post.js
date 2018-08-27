import React, { Component } from 'react';
import '../styles/Post.css'
import UpdatePostForm from './UpdatePostForm.js'

// need to create a post with title, content, date
// need to pull data from app which pulls from database

class Post extends Component {
    
    constructor (props) {
        super (props)
        this.state = {
            needsUpdate: false
        }
        this.setNeedsUpdate.bind(this)
    }

    setNeedsUpdate (updateState) {
        this.setState({needsUpdate: updateState})
    }

    render() {  
        return (
            <div className="post">
                <h3>{this.props.post.title}</h3>
                <p>{this.props.post.content}</p>
                <button onClick={(e) => this.setNeedsUpdate(true, e)}>Update</button>
                {this.state.needsUpdate ? <UpdatePostForm post={this.props.post} token={this.props.token} updatePost={this.props.updatePost} /> : null}
            </div>
        )
    }
}

export default Post;