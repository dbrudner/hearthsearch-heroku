import React from 'react'

export default class DeckSearchbar extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            term: ''
        }
    }

    onChange = (event) => {
        const term = event.target.value
        this.setState({
            term
        })

    }

    handleSubmit = (event) => {
        event.preventDefault()
        const filterName = 'term'
        const term = this.state.term

        this.props.getFilter(filterName, term)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <input onChange={this.onChange} type='text' name='term'/>
                    <button type='submit' className='btn submit-btn hvr-fade'>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </form>
        )
    }
}