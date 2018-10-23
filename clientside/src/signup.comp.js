import * as React from 'react';
import './style-sheets/signup/signup.css'
export class Signup extends React.Component {

    validateEmail = (email) => {
        return this.props.validateEmail(email);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.refs.email.value;
        let userName = this.refs.userName.value;
        let password = this.refs.password.value;
        if (!this.validateEmail(email)) {
            return alert("Enter valid email adress");
        }
        if (!userName) {
            return alert("You didn't enter your name");
        }
        if (!(8 < password < 12)) {
            return alert("Enter valid password");
        }
        let user = { email: email, userName: userName, password: password }
        this.props.signup(user);
    }

    render() {
        return (
            <div id='signup-box'>
                <h1>Sign up</h1>
                
                <div id='signup'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Email adress" ref="email" />
                        <input type="text" placeholder="Your name" ref="userName" />
                        <input type="password" placeholder="Password (8-12 chars)" ref="password" />
                        <button type="submit" value="Submit"> Submit</button>
                    </form>
                    <button onClick={this.props.returnHome}> cancel </button>
                </div>
            </div>
        );
    };

}

