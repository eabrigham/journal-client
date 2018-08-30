// For every post in the app state,
// create a post and display it.
// The file I started playing.

import React from 'react'
import Post from './Post.js'

const PostList = props => {
    const postJsxArray = []
    // list of posts from the App.js state
    const postList = props.postList
    for (let i = 0; i < postList.length; i++) {
        // prevents deleted posts which have been set to null from being added
        if (postList[i]) {
            // add index number to object so it can be used during update
            postList[i].stateIndex = i
            // pass to each post the information needed to pass to the update form
            postJsxArray.push(<Post key={i} post={postList[i]} token={props.token} updatePost={props.updatePost} />)
        }
    }

    return (
        <div>
            {postJsxArray}
        </div>
    )
}

export default PostList