import React from 'react'
import axios from 'axios'
import config from '../config.js'

// currently an uncontrolled form.
// would need to make this a stateful component to control inputs.

const SignInForm = (props) => {

    const signInSubmit = e => {
        e.preventDefault()

        const formData = {}
        for (let field of e.target.elements) {
            if (field.name === '') {
                continue
            }
            formData[field.name] = field.value;
        }

        console.log(formData)

        axios.post(`${config.apiUrl}/sign-in`, {credentials: formData})
            // store token
            .then(res => { 
                console.log(res)
                props.setToken(res.data.user.token)
                return res.data.user.token
            })
            // get all posts from back end and update store
            .then ((token) => axios({
                method: "get",
                url: `${config.apiUrl}/posts`,
                headers: {
                  Authorization: `Token token=${token}`
                }
              }))
            .then(res => {
                console.log(res)
                return res
            })
            .then(res => props.setPosts(res.data.posts))
            .catch(err => console.error(err))
    }


    return (
        <form className = "SignInForm-form" onSubmit = {signInSubmit}>
            <label>Email:</label>
            <input type="text" name="email" />
            <label>Password:</label>
            <input type="password" name="password" />
            <button type="submit">Sign In</button>
        </form>
    )
}

export default SignInForm