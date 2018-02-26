import React, { Component } from 'react'
import Filters from '../filter-components/filters'
import axios from 'axios'
import ClassBreakdown from './class-breakdown'

export default class Analytics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: []
        }
    }

    componentDidMount() {

		axios.get('/api/cards/collectible')
		.then((data) => {
			this.setState({cards: data.data})
		}).catch(err => console.log(err))
	}
    


	

    render() {

        return (
            <div className='row'>
                <ClassBreakdown cards={this.state.cards}/>
            </div>
        )
        
    }

}