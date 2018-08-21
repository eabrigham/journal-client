import React from 'react';

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
            formData[field.name] = field.value
        }
        console.log(formData)
    }


    return (
        <form className = "SignUpForm-form" onSubmit = {signUpSubmit}>
            <label>Email:</label>
            <input type="text" name="email" />
            <label>Password:</label>
            <input type="password" name="password" />
            <label>Confirm Password:</label>
            <input type="password" name="confirm-password" />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignUpForm;