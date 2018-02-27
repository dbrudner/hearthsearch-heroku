import React, {Component} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


export default class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            isLoggedIn: '',
            email: '',
            password2: ''
        }

    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handlePassword2Change = event => {
        this.setState({
            password2: event.target.value
        })
    }

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit = event => {

        event.preventDefault();

        if (this.state.password !== this.state.password2) {
            this.setState({
                passwordConfirmError: true
            })
            return
        }

        console.log("HI")
        let username = this.state.username
        let email = this.state.email
        let password = this.state.password

        axios.post('/signup', {
            email, username, password
          })
          .then(response => {
            axios.post('/api/user/email/', {email})
            
          }).then(resp => {
            console.log('resp', resp)
            this.setState(() => {
                return ({
                    redirectTo: '/'
                })
            })
          })
          
          .then(() => {
              this.props.handleClose()
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentWillMount() {
        axios.get('/test')
        .then((response) => {
            if (response.data) {
                this.setState(() => {
                    return {
                        isLoggedIn: true,
                        email: response.data.local.email
                    }
                })
               
            }
        })
    }

    render() {

        if (this.state.isLoggedIn) {
            return (
                <div>
                    You're already logged in as {this.state.email}
                </div>
            )
        }

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className='text-center center-block login-container'>
                {this.state.loginError === 'error' ? <div>Login Error</div> : <div/>}
                    {this.state.loginError === 'loading' ? 
                        <div>Loading</div>
                        :
                        <div/>
                    }                     
                <form onSubmit={this.handleSubmit}>
                    <div className='login-hdr'>
                        <div>
                            <i class="lightblue fas fa-user-plus"></i>
                        </div>
                        <div>
                            Sign Up
                        </div>
                    </div>
                    <hr/>
                        <div className='input-field center-block text-center sml-mrg'>
                            <input placeholder='Username' name='username' type="text" value={this.state.value} onChange={this.handleUsernameChange} />
                        </div>
                        <div className='input-field center-block text-center sml-mrg'>
                            <input placeholder='Email' className='' name='email' type="text" value={this.state.value} onChange={this.handleEmailChange} />
                        </div>
                        <div className='input-field center-block text-center sml-mrg'>
                            <input placeholder='Enter Password' className='pass' name='password' type="password" value={this.state.value} onChange={this.handlePasswordChange} />
                        </div>
                        <div className='input-field center-block text-center sml-mrg'>
                            <input placeholder='Confirm your password' className='pass2' name='password2' type="password" value={this.state.value} onChange={this.handlePassword2Change} />
                        </div>
                    <div className='text-center'>
                        <button className="btn btn-primary login-btn" type="submit" name="action">Sign Up
                        </button>
                    </div>
                </form>
            </div>
            )
        }
    }
}