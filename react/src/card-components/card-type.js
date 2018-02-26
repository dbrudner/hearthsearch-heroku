import React from 'react'

function renderAttribute(attribute, value) {
	return (
		<div>
			<strong>{attribute}: </strong>{value}
		</div>
	)
}	

export default function CardType(props) {


	if (props.type === 'Minion') {
		return (
			<div>
				{renderAttribute('Type', 'Minion')}
				{renderAttribute('Attack', props.attack)}
				{renderAttribute('Health', props.health)}
			</div>
		)	
	}

	if (props.type === 'Spell') {
		return (
			renderAttribute('Type', 'Spell')
		)		
	}

	if (props.type === 'Weapon') {
		return (
			renderAttribute('Type', 'Weapon')
		)
		
	}

	if (props.type === 'Enchantment') {
		return (
			renderAttribute('Type', 'Enchantment')
		)
	}
		
	return (
		<div></div>
	)
	
}