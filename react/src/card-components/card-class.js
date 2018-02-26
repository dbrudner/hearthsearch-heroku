import React from 'react'

export default function CardClass(props) {


	if (props.hero === 'Paladin') {
		return (
			<span className='paladin class'>Paladin</span>
		)
	}

	if (props.hero === 'Druid') {
		return (
			<span className='druid class'>Druid</span>
		)
	}

	if (props.hero === 'Warrior') {
		return (
			<span className='warrior class'>Warrior</span>
		)
	}

	if (props.hero === 'Warlock') {
		return (
			<span className='warlock class'>Warlock</span>
		)
	}

	if (props.hero === 'Mage') {
		return (
			<span className='mage class'>Mage</span>
		)
	}

	if (props.hero === 'Hunter') {
		return (
			<span className='hunter class'>Hunter</span>
		)
	}

	if (props.hero === 'Rogue') {
		return (
			<span className='rogue class'>Rogue</span>
		)
	}

	if (props.hero === 'Shaman') {
		return (
			<span className='shaman class'>Shaman</span>
		)
	}

	if (props.hero === 'Priest') {
		return (
			<span className='priest class'>Priest</span>
		)
	}

	if (props.hero === 'Neutral') {
		return (
			<span className='neutral class'>Neutral</span>
		)
	}

	return (
		<span></span>
	)
}