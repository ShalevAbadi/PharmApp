import * as React from 'react';
import './style-sheets/signup/signup.css'
import { debounce } from "lodash";
export class Signup extends React.Component {

    state = {
        emailMessage: ''
    }

    validateEmail = (email) => {
        return this.props.validateEmail(email);
    }

    validateEmailAddressWithServer = debounce(() => {
        this.setState({emailMessage : ''});
        this.props.checkIfEmailExist(this.refs.email.value).catch((error) => {
            this.setState({ emailMessage: error.response.data.message });
        });
    }, 2000)

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
        if ((8 > password.length) || password.length > 12) {
            return alert("Enter valid password");
        }
        let user = { email: email, userName: userName, password: password }
        this.props.signup(user);
    }

    render() {
        return (
            <div id='signup-box'>
                <div id='signup'>
                    <h1>Sign up</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Email adress" ref="email" onChange={this.validateEmailAddressWithServer} />
                        <p className='email-error'>{this.state.emailMessage}</p>
                        <input type="text" placeholder="Your name" ref="userName" />
                        <input type="password" placeholder="Password (8-12 chars)" ref="password" />
                        <button type="submit" value="Submit"> Submit</button>
                        <button onClick={this.props.returnHome}> cancel </button>
                    </form>
                </div>
            </div>
        );
    };

}

