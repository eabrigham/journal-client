import React from 'react'
import axios from 'axios'
import config from '../config.js'
import '../styles/Form.css'

// currently an uncontrolled form.
// would need to make this a stateful component to control inputs.

const ChangePasswordForm = (props) => {

    const changePasswordSubmit = e => {
        e.preventDefault()

        const formData = {}
        for (let field of e.target.elements) {
            if (field.name === '') {
                continue
            }
            formData[field.name] = field.value;
        }

        console.log(formData)
        if (formData["new"] !== formData["new_confirmation"]) {
            console.error('passwords do not match')
            // TODO proper error message
            return false
        } 
        axios({
            method: "patch",
            url: `${config.apiUrl}/change-password`,
            headers: {
              Authorization: `Token token=${props.token}`
            },
            data: {passwords: formData}
          })
            .then(data => console.log(data))
            // TODO setter method get data to App.js
            .catch(err => console.error(err))
    }


    return (
        <form className = "ChangePasswordForm-form" onSubmit = {changePasswordSubmit}>
            <label>
                Current Password:
                <input type="password" name="old" />
            </label>
            <label>
                New Password:
                <input type="password" name="new" />
            </label>
            <label>
                Confirm New Password:
                <input type="password" name="new_confirmation" />
            </label>
            <button type="submit">Change Password</button>
        </form>
    )
}

export default ChangePasswordForm