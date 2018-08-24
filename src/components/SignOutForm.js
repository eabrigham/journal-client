import React from 'react'
import axios from 'axios'
import config from '../config.js'
import '../styles/Form.css'

// currently an uncontrolled form.
// would need to make this a stateful component to control inputs.

const SignOutForm = (props) => {

    const signOutSubmit = e => {
        e.preventDefault()

        axios({
            method: "delete",
            url: `${config.apiUrl}/sign-out`,
            headers: {
              Authorization: `Token token=${props.token}`
            }
          })
            .then(res => { 
                return res
            })
            .then(res => {
                props.setToken(null)
                props.setPosts([])
            })
            .then(props.feedbackMessage('Signed out successfully', 'SignOutForm'))
            // TODO setter method get data to App.js
            .catch(err => {
                props.feedbackMessage('Signed out failed', 'SignOutForm')
            })
    }


    return (
        <form className = "SignOutForm-form" onSubmit = {signOutSubmit}>
            <button type="submit">Sign Out</button>
            <p>{props.feedbackMsg}</p>
        </form>
    )
}

export default SignOutForm