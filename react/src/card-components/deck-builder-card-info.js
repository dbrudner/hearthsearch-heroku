import React, {Component} from 'react'
import AddToDeck from './add-to-deck'
import CardImage from './card-image'
import CardFlavor from './card-flavor'
import CardClass from './card-class'
import CardSoundBoard from './card-sound-board'
import CardLightForge from './card-lightforge'
import CardRarity from './card-rarity'
import CardCardset from './card-cardset'
import CardQuantity from './card-quantity'
import CardPopularity from './card-popularity'

export default class CardInfo extends Component{
	
	constructor(props) {
		super(props)

		this.state = {
			card: '',
			quantity: this.props.quantity
		}

	}

	getCard = (name, mana, rarity, cardSet, hero, dbfId, cardId, _id) => {
		const card = {
			name,
			mana,
			rarity,
			cardSet,
			hero,
			dbfId,
			cardId,
			_id
		}
		this.props.getCard(card)
	}

	handleChange(event) {

		this.setState({ term: event.target.value });
		this.props.onSearch(event.target.value);
	}

	render() {


		const cardInclusions = {
			wild: this.props.inclusionsWild, 
			standard: this.props.inclusionsStandard
		}		
		
		return (
		
			<div className=''>
                <CardImage noArtist image={this.props.image} artist={this.props.artist}  _id={this.props._id} buildMode getCard={this.getCard} cardId={this.props.cardId} dbfId={this.props.dbfId} rarity={this.props.rarity} name={this.props.name} mana={this.props.cost} cardSet={this.props.cardSet} hero={this.props.class}/>
			</div>
		)
	}	
}