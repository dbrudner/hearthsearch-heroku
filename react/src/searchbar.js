import React from 'react';

class Searchbar extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			term: '',
			filterControls: false
		}

	}

	handleChange = (event) => {
		this.setState({ term: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSearch('term', this.state.term);		
	}
	
	render() {

		

		return (
			<div className='animated fadeIn'>
				<div className='searchbar-header'>
					Search <div className='searchbar-description'>by card name or text</div>
				</div>
				<form onSubmit={this.handleSubmit} className='searchbar-form text-center'>
					<div class=''>
						<input className='search-bar-input' type="text" name="term" onChange={this.handleChange}/>
						<button type='submit' className='btn search-btn hvr-fade'>
							<i className="fas fa-search"></i>
						</button>
					</div>					
				</form>
				
			</div>
		)
	}
}

export default Searchbar;