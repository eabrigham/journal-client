import React from 'react'
import axios from 'axios'
import config from '../config.js'
import '../styles/Form.css'

// currently an uncontrolled form.
// would need to make this a stateful component to control inputs.

const SignUpForm = (props) => {

    const signUpSubmit = e => {
        e.preventDefault()

        const formData = {}
        for (let field of e.target.elements) {
            if (field.name === '') {
                continue
            }
            formData[field.name] = field.value;
        }

        console.log(formData)
        if (formData["password"] !== formData["password_confirmation"]) {
            console.error('passwords do not match')
            // TODO proper error message
            return false
        } 
        axios.post(`${config.apiUrl}/sign-up`, {credentials: formData})
            .then(data => console.log(data))
            // TODO setter method get data to App.js
            .catch(err => console.error(err))
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
        </form>
    )
}

export default SignUpForm