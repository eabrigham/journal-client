import React from 'react'
import axios from 'axios'
import config from '../config.js'
import '../styles/Form.css'

// currently an uncontrolled form.
// would need to make this a stateful component to control inputs.

const SignUpForm = (props) => {

    const signUpSubmit = e => {
        e.preventDefault()

        // add all the fields of the target form to object formData
        // skip unnamed fields to avoid adding button
        const formData = {}
        for (let field of e.target.elements) {
            if (field.name === '') {
                continue
            }
            formData[field.name] = field.value;
        }
        // clear out the form after retreiving data
        e.target.reset()

        if (formData["password"] !== formData["password_confirmation"]) {
            props.feedbackMessage('Passwords do not match', 'SignUpForm')
            return false
        } 
        axios.post(`${config.apiUrl}/sign-up`, {credentials: formData})
            .then(data => {
                props.feedbackMessage('Signed up successfully', 'SignUpForm')
            })
            .catch(err => {
                props.feedbackMessage('Sign up was unable to run', 'SignUpForm')
            })
    }


    return (
        <form className = "SignUpForm-form" onSubmit = {signUpSubmit}>
            <label>
                Email:
                <input type="text" name="email" />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <label>
                Confirm Password: 
                <input type="password" name="password_confirmation" />
            </label>
            <button type="submit">Sign Up</button>
            <p>{props.feedbackMsg}</p>
        </form>
    )
}

export default SignUpForm