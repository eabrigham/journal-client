import React from 'react'
import axios from 'axios'
import config from '../config.js'
import '../styles/Form.css'

// see SignUpForm for more detailed comments of a similar component

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
                console.log(res)
                return res
            })
            // Reset the App.js state so the token is null and posts array is empty
            // This will automatically redisplay the sign up/in and undisplay the posts
            .then(res => {
                props.setToken(null)
                props.setPosts([])
            })
            .then(props.feedbackMessage('Signed out successfully', 'SignOutForm'))
            .catch(err => {
                console.error(err)
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