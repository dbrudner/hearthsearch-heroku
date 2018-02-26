import React from 'react';

class CardTextSearchbar extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			textSearchTerm: '',
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ textSearchTerm: event.target.value });
		this.props.onSearch(event.target.value);
	}
	
	render() {
		return (
			<div className='search-bar form-group'>
				<input className='form-control' type="text" name="term" onChange={this.handleChange}/>
			</div>
		)
	}
}

export default CardTextSearchbar;