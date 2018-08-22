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

        console.log(formData)

        const authHeader = {headers: {Authorization: `Token token=${props.token}`} }
        console.log('In PostForm and the auth header is ', authHeader)
 
        axios.post(`${config.apiUrl}/posts`, authHeader, formData)
            .then(data => console.log(data))
            // TODO setter method get data to App.js
            .catch(err => console.error(err))
    }


    return (
        <form className = "postForm-form" onSubmit = {postSubmit}>
            <label>Title:</label>
            <input type="text" name="title" />
            <label>Write Post:</label>
            <input type="text" name="content" />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default PostForm