import React from 'react'
import axios from 'axios'
import config from '../config.js'
import '../styles/Form.css'

// currently an uncontrolled form.
// would need to make this a stateful component to control inputs.
// (Meaning we are trusting the user to not put in stuff that would break or hack the app)

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

        console.log(formData)
        if (formData["password"] !== formData["password_confirmation"]) {
            props.feedbackMessage('Passwords do not match', 'SignUpForm')
            return false
        } 
        // posts axios request to either local or production url depending where
        // app is currently hosted
        axios.post(`${config.apiUrl}/sign-up`, {credentials: formData})
            .then(data => {
                // If user signs up correctly, use feedbackMessage function sent down via props
                // It will store that SignUpForm has a message which needs to be displayed
                // Note that SignUpForm is stored as a string and not actually connected to the component
                props.feedbackMessage('Signed up successfully', 'SignUpForm')
            })
            .catch(err => {
                // console.error(err)
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
            
            {/* Where user feedback displays
                A message will only be passed down if feedbackMessage function
                is run and indentifies SignOutForm as having a message. 
                feedbackMessage takes care of the timer and resetting the message. */}
            <p>{props.feedbackMsg}</p>
        </form>
    )
}

export default SignUpForm