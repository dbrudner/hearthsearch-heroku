import React from 'react'
import ReactImageFallback from "react-image-fallback"

export default function CardImage(props) {

	const addToDeck = (name, mana, rarity, cardSet, hero, dbfId, cardId, _id) => {
        props.getCard(name, mana, rarity, cardSet, hero, dbfId, cardId, _id);
    }

    const handleClick = (event) => {
		console.log("HI?")
		event.preventDefault()
		
		if (props.buildMode) {
			addToDeck(props.name, props.mana, props.rarity, props.cardSet, props.hero, props.dbfId, props.cardId, props._id)			
		}

    }


	return (
		<div className='image-container'>
			{(props.image) ? 
				<ReactImageFallback 
					src={props.image}
					fallbackImage='images/card_back_legend.gif'
					className='hvr-float card-image center-block img-responsive'
					initialImage='images/card_back_legend.gif'
					alt={props.name}
					onClick={handleClick}					
				/>
			:
				<img 
					src='images/card_back_legend.gif'
					className='legend-cardback center-block img-fluid'
					alt={props.name}
					onClick={handleClick}
				/>
			}
			{props.artist && !props.noArtist ? <div className='artist'>Artist: {props.artist}</div> : <div />}
			{/* <div className='wiki-link' ><a target='_blank' href={`https://hearthstone.gamepedia.com/${props.name}`}>Wiki</a></div> */}

		</div>
	)
	
}