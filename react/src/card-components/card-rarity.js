import React from 'react'

export default function Rarity(props) {

	if (props.rarity === "Free") {
		return (
			<div><div className='rarity common'>Free <span className={props.type}>{props.type}</span></div></div>
		)
	}

	if (props.rarity === "Common") {
		return (
			<div><div className='rarity common'>Common <span className={props.type}>{props.type}</span></div></div>
		)
	}

	if (props.rarity === "Rare") {
		return (
			<div><div className='rarity rare'>Rare <span className={props.type}>{props.type}</span></div></div>
		)
	}

	if (props.rarity === "Epic") {
		return (
			<div><div className='rarity epic'>Epic <span className={props.type}>{props.type}</span></div></div>
		)
	}

	if (props.rarity === "Legendary") {
		return (
			<div><div className='rarity legendary'>Legendary <span className={props.type}>{props.type}</span></div></div>
		)
	}

	return (
		<div></div>
	)
}