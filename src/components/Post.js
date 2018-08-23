import React from 'react';
import '../styles/Post.css'

// need to create a post with title, content, date
// need to pull data from app which pulls from database
// via ajax
const Post = props => {
    return (
        <div className="post">
            <h3>{props.post ? props.post.title : null}</h3>
            {/* want to have post title and content, eventually date */}
            <p>{props.post.content}</p>
        </div>
    )
}

export default Post;