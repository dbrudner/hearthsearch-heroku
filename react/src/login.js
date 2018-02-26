import React, {Component} from 'react'
import axios from 'axios'
// import { Redirect } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom'
import Banner from './banner'
import potato from './images/potato.svg'


export default class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            redirectTo: null,
            loginError: false
        }
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleUsernameChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    handleLogin = event => {
        console.log("HI")
        event.preventDefault();
        let email = this.state.email
        let password = this.state.password

        this.setState({
            loginError: 'loading'
        })

        setTimeout(() => {
            this.setState({
                loginError: 'error'
            })
        }, 2000)

        console.log(email)
        console.log(password)

        axios.post('/login', {
            email, password
          })
            .then((res) => {
                window.location.href='/'
            })
          .catch(function (error) {
            console.log(error);
          }); 
    }
    

    render() {
                    

        return (
            <div className='text-center center-block login-container'>
                {this.state.loginError === 'error' ? <div>Login Error</div> : <div/>}
                    {this.state.loginError === 'loading' ? 
                        <div>Loading</div>
                        :
                        <div/>
                    }                     
                <form onSubmit={this.handleLogin}>
                <div className='login-hdr'>
                    <div>
                        <i className="lightblue far fa-user"></i>
                    </div>
                    <div>
                        Login
                    </div>
                </div>
                <hr/>
                    <div className='input-field center-block text-center'>
                        <input placeholder='Username' name='username' type="text" value={this.state.value} onChange={this.handleUsernameChange} />
                    </div>
                    <div className='input-field center-block text-center'>
                        <input placeholder='Password' className='pass' name='password' type="password" value={this.state.value} onChange={this.handlePasswordChange} />
                    </div>
                <div className='text-center'>
                    <button className="btn btn-primary login-btn" type="submit" name="action">Login
                    </button>
                </div>
                </form>
            </div>
        )
    }
}