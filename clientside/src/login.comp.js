import * as React from 'react';


export class Login extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        if (!email){
            alert("Insert email to continue");
            return;
        }
        if (!password){
            alert("Insert password to continue");
            return;
        }
        let loginData= {email: email, password: password};
        this.props.onSubmit(loginData);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="Email" ref="email"/> 
                <input type="password" placeholder="Password" ref="password" />
                <input type="submit" value="Submit" />
                </form> 
            </div>
        );
    }

}