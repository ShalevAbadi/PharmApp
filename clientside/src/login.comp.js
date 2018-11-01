import * as React from 'react';
import './style-sheets/login/login.css'

export class Login extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        if (!email) {
            alert("Insert email to continue");
            return;
        }
        if (!password) {
            alert("Insert password to continue");
            return;
        }
        let loginData = { email: email, password: password };
        this.props.onSubmit(loginData);
    }

    onSignup = () => {
        this.props.changePage('signup');
    }

    render() {
        return (
            <div id='login-box'>
                <div id='login'>
                    <h1>Sign in</h1>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" placeholder="Email" ref="email" />
                        <input type="password" placeholder="Password" ref="password" />
                        <button type="submit" value="Submit"> Submit</button>
                    </form>
                    <p >not a user? <a href='#' onClick={this.onSignup} >signup </a></p>
                </div>
            </div>
        );
    }

}