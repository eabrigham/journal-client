// For every post in the app state,
// create a post and display it.

import React from 'react'
import Post from './Post.js'

const PostList = props => {
    // can I just create a JSX div and append shit? does that work?
    const postJsxArray = []
    // list of posts from the App.js state
    const postList = props.postList
    for (let i = 0; i < postList.length; i++) {
        // how to append posts JSX objects? need to return them...
        postJsxArray.push(<Post key={i} post={postList[i]} token={props.token}/>)
    }

    return (
        <div>
            {postJsxArray}
        </div>
    )
}

export default PostList