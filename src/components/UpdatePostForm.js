import React from 'react'
import axios from 'axios'
import config from '../config.js'

// currently an uncontrolled form.
// would need to make this a stateful component to control inputs.

const UpdatePostForm = (props) => {
    console.log('in UpdatePostForm and post is ', props.post)
    console.log('in UpdatePostForm and the token is ', props.token)

    const postSubmit = e => {
        e.preventDefault()

        // get the data from the form fields and package it into an object
        const formData = {}
        for (let field of e.target.elements) {
            if (field.name === '') {
                continue
            }
            formData[field.name] = field.value;
        }
        e.target.reset()

        console.log('In UpdatePostForm and formData is ', formData)

        // send info to back end via patch
        axios({
            method: "PATCH",
            url: `${config.apiUrl}/posts/${props.post.id}`,
            headers: {
              Authorization: `Token token=${props.token}`
            },
            data: {post: formData}
          })
          .then(res => { 
              console.log('updated successfully')
              console.log(res.data.post)
            // update post to App state
                props.updatePost(props.post.id, res.data.post)
            // user message

            // remove update form box
            })
          .catch(err => {
              console.log(err)
            //   props.feedbackMessage('Create post failed', 'PostForm')
            })
        };

    return (
        <form className = "postForm-form" onSubmit = {postSubmit}>
            <label>
                Title:
                <input type="text" name="title" defaultValue={props.post.title} />
            </label>
            <label>
                Write Post:
                <input type="text" name="content" defaultValue={props.post.content} />
            </label>
            <button type="submit">Submit Update</button>
            {/* user messaging for update might be a handful... */}
            {/* have to send props */}
            {/* <p>{props.feedbackMsg}</p> */}
        </form>
    )
}

export default UpdatePostForm