import React from 'react'
import axios from 'axios'
import config from '../config.js'

// see SignUpForm for more detailed comments of a similar component

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
            // addPost pushes post onto post array in App state (using setState)
              props.addPost(res.data.post)
            })
          .catch(err => {
            //   console.log(err)
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