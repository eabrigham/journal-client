import React from 'react'
import axios from 'axios'
import config from '../config.js'

// currently an uncontrolled form.
// would need to make this a stateful component to control inputs.

const PostForm = (props) => {

    const postSubmit = e => {
        e.preventDefault()

        const formData = {}
        for (let field of e.target.elements) {
            if (field.name === '') {
                continue
            }
            formData[field.name] = field.value;
        }
        e.target.reset()

        axios({
            method: "post",
            url: `${config.apiUrl}/posts`,
            headers: {
              Authorization: `Token token=${props.token}`
            },
            data: {post: formData}
          })
          .then(res => { 
              props.addPost(res.data.post)

            })
          .catch(err => {
              props.feedbackMessage('Create post failed', 'PostForm')
            })
        };

    return (
        <form className = "postForm-form" onSubmit = {postSubmit}>
            <label>
                Title:
                <input type="text" name="title" />
            </label>
            <label>
                Write Post:
                <input type="text" name="content" />
            </label>
            <button type="submit">Create Post</button>
            <p>{props.feedbackMsg}</p>
        </form>
    )
}

export default PostForm