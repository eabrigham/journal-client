import React from 'react'
import axios from 'axios'
import config from '../config.js'

// see SignUpForm for more detailed comments of a similar component

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
        e.target.reset()

        axios.post(`${config.apiUrl}/sign-in`, {credentials: formData})
            // store token
            .then(res => { 
                props.setToken(res.data.user.token)
                return res.data.user.token
            })
            // get all of the user's posts from back end
            .then ((token) => axios({
                method: "get",
                url: `${config.apiUrl}/posts`,
                headers: {
                  Authorization: `Token token=${token}`
                }
              }))
            // update posts array in App.js state
            .then(res => props.setPosts(res.data.posts))
            .then(props.feedbackMessage('Signed in successfully', 'SignInForm'))
            .catch(err => {
                // console.error(err)
                props.feedbackMessage('Sign in failed. Check your username and password.', 'SignInForm')
            })
    }


    return (
        <form className = "SignInForm-form" onSubmit = {signInSubmit}>
            <label>
                Email:
                <input type="text" name="email" />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <button type="submit">Sign In</button>
            <p>{props.feedbackMsg}</p>
        </form>
    )
}

export default SignInForm