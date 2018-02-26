import React from 'react'

export default function HowToGet(props) {
	if (props.howToGet && props.howToGetGold) {
		return (
			<div>
				<div><strong>How to get: </strong>{props.howToGet}</div>
				<div><strong>How to get gold: </strong>{props.howToGetGold}</div>	
			</div>
		)
	}
	return (<div/>)
}