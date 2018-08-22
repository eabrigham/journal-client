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

        axios({
            method: "post",
            url: `${config.apiUrl}/posts`,
            headers: {
              Authorization: `Token token=${props.token}`
            },
            data: {post: formData}
          })
          .then(res => console.log(res))
          .catch(err => console.log(err))
        };

        // axios.post(`${config.apiUrl}/posts`, {Authorization: `Token token=${props.token}`}, formData)
        //     .then(res => console.log(res))
        //     // TODO setter method get data to App.js
        //     .catch(err => console.error(err))

        // const requestData = {
        //     method: 'POST',
        //     headers: {'':'application/json'},
        //     data: JSON.stringify({credentials: formData}),
        //     url: `${config.apiUrl}/sign-up`
        // }
        // console.log('request data is ', requestData)
        // axios(requestData)
        //     .then(response => console.log(response))
        //     // TODO setter send data to App.js
        //     .catch(err => console.error(err))
    


    return (
        <form className = "postForm-form" onSubmit = {postSubmit}>
            <label>Title:</label>
            <input type="text" name="title" />
            <label>Write Post:</label>
            <input type="text" name="content" />
            <button type="submit">Create Post</button>
        </form>
    )
}

export default PostForm