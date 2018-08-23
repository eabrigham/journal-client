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
                console.log(res)
                return res
            })
            .then(res => {
                props.setToken(null)
                props.setPosts([])
            })
            // TODO setter method get data to App.js
            .catch(err => console.error(err))
    }


    return (
        <form className = "SignOutForm-form" onSubmit = {signOutSubmit}>
            <button type="submit">Sign Out</button>
        </form>
    )
}

export default SignOutForm