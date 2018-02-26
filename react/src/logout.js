import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


export default class Logout extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            fireRedirect: null
        }
    }

    componentDidMount() {
        axios.get('/profile/logout')
            .then(response => {
                this.setState({
                    fireRedirect: true
                })
                console.log("HI")
            })
    }
    
    render() {
        if (this.state.fireRedirect) {
            return <Redirect to={{ pathname: '/search' }} />
        } else {
            return <div/>
        }  
    }  
}