import React from 'react'
import axios from 'axios'
import config from '../config.js'

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

        // previously used this but it didn't work:
        axios.post(`${config.apiUrl}/sign-up`, {credentials: formData})

        // const requestData = {
        //     method: 'POST',
        //     headers: {'content-type':'application/json'},
        //     data: JSON.stringify({credentials: formData}),
        //     url: `${config.apiUrl}/sign-up`
        // }
        // console.log('request data is ', requestData)
        // axios(requestData)
        //     .then(response => console.log(response))
        //     // TODO setter send data to App.js
        //     .catch(err => console.error(err))
    }


    return (
        <form className = "SignUpForm-form" onSubmit = {signUpSubmit}>
            <label>Email:</label>
            <input type="text" name="email" />
            <label>Password:</label>
            <input type="password" name="password" />
            <label>Confirm Password:</label>
            <input type="password" name="password_confirmation" />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignUpForm