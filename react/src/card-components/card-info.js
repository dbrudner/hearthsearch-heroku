import React, {Component} from 'react'
import AddToDeck from './add-to-deck'
import CardImage from './card-image'
import CardPopularity from './card-popularity'
import CardFlavor from './card-flavor'
import CardClass from './card-class'
import CardSoundBoard from './card-sound-board'
import CardLightForge from './card-lightforge'
import CardRarity from './card-rarity'
import CardCardset from './card-cardset'
import CardQuantity from './card-quantity'

export default class CardInfo extends Component{
	
	constructor(props) {
		super(props)

		this.state = {
			card: '',
			quantity: this.props.quantity
		}

	}

	// componentWillReceiveProps(nextProps) {
	// 	// console.log(nextProps)
	// 	if (nextProps) {
	// 		let quantity = nextProps.deck.map(card => {
	// 			if (card.dbfId === nextProps.dbfId) {
	// 				// console.log(card.name, card.quantity)
	// 				return card.quantity
	// 			}
	// 		})

	// 		quantity = quantity[0]
	// 		this.setState({
	// 			quantity
	// 		})
	// 	}	
		
	// }

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

		if (this.props.wideCards) {
			if (this.props) {
				// console.log('props', this.props)				
			}

			return (
				<div className=''>
					<div className='card-list-header'>
						<div>
							<div>
								<span><CardClass hero={this.props.class}/></span>
								<span className='cardset'> - {this.props.cardset}</span>
							</div>
							<div className='some-marg'>
								
							</div>
							<div>
								<CardLightForge lightForge={this.props.lightForgeScore}/>
							</div>								
						</div>
						<div>
							<div className='add-cntr'>
								<AddToDeck _id={this.props._id} buildMode={this.props.buildMode} getCard={this.getCard} cardId={this.props.cardId} dbfId={this.props.dbfId} rarity={this.props.rarity} name={this.props.name} mana={this.props.cost} cardSet={this.props.cardSet} hero={this.props.class}/>
							</div>
						</div>
					</div>
					<div>
						<CardQuantity name={this.props.name} deck={this.props.deck} />
					</div>
					<div>
						{this.props.decksInfo ? <CardPopularity
							wideCards
							decksInfo={this.props.decksInfo} 
							hero={this.props.class} 
							cardInclusions={cardInclusions}
							rarity={this.props.rarity}
							name={this.props.name}
						/>
						:
						<div/>
					}
						
					</div>
						<CardImage image={this.props.image} artist={this.props.artist}  _id={this.props._id} buildMode={this.props.buildMode} getCard={this.getCard} cardId={this.props.cardId} dbfId={this.props.dbfId} rarity={this.props.rarity} name={this.props.name} mana={this.props.cost} cardSet={this.props.cardSet} hero={this.props.class}/>
					<hr/>
					<div className='bottom-card-container'>
						{/* <CardCardset cardset={this.props.cardset} /> */}
						<CardRarity hero={this.props.class} rarity={this.props.rarity} type={this.props.type} cardset={this.props.cardset} />
						<CardFlavor flavor={this.props.flavor} />											
						{ (this.props.type === 'Minion') ? (<CardSoundBoard cardId={this.props.cardId} name={this.props.name} dbfId={this.props.dbfId}/>) : null }
					</div>
				</div>
			)
		}

		if (this.props.buildMode) {
			if (this.props) {
				// console.log('props', this.props)				
			}

			return (
				<div className=''>
					<div className='card-list-header'>
						<div>
							<div className='no-oflow'>
								<span><CardClass hero={this.props.class}/></span>
							</div>
							<div className='some-marg'>
								
							</div>
							<div>
								<CardLightForge lightForge={this.props.lightForgeScore}/>
							</div>								
						</div>
						<div>
							<div className='add-cntr'>
								<AddToDeck _id={this.props._id} buildMode={this.props.buildMode} getCard={this.getCard} cardId={this.props.cardId} dbfId={this.props.dbfId} rarity={this.props.rarity} name={this.props.name} mana={this.props.cost} cardSet={this.props.cardSet} hero={this.props.class}/>
							</div>
						</div>
					</div>
						<div>{this.props.cardset}</div>
					<div>
						<CardQuantity name={this.props.name} deck={this.props.deck} />
					</div>
					<div>
						{this.props.decksInfo ? <CardPopularity 
							decksInfo={this.props.decksInfo} 
							hero={this.props.class} 
							cardInclusions={cardInclusions}
							rarity={this.props.rarity}
							name={this.props.name}
						/>
						:
						<div/>
					}
						
					</div>
						<CardImage image={this.props.image} artist={this.props.artist}  _id={this.props._id} buildMode={this.props.buildMode} getCard={this.getCard} cardId={this.props.cardId} dbfId={this.props.dbfId} rarity={this.props.rarity} name={this.props.name} mana={this.props.cost} cardSet={this.props.cardSet} hero={this.props.class}/>
					<hr/>
					<div className='bottom-card-container'>
						{/* <CardCardset cardset={this.props.cardset} /> */}
						<CardRarity hero={this.props.class} rarity={this.props.rarity} type={this.props.type} cardset={this.props.cardset} />
						<CardFlavor flavor={this.props.flavor} />											
						{ (this.props.type === 'Minion') ? (<CardSoundBoard cardId={this.props.cardId} name={this.props.name} dbfId={this.props.dbfId}/>) : null }
					</div>
				</div>
			)
		}
		
		return (
		
			<div className=''>
				<div className='card-list-header'>
					<div>
						<div className='no-oflow'>
							<span><CardClass hero={this.props.class}/></span>
						</div>
					</div>
					<div>
						<div>
							<CardLightForge lightForge={this.props.lightForgeScore}/>
						</div>
					</div>
				</div>
				<div>{this.props.cardset}</div>
				<div>
						{this.props.decksInfo ? <CardPopularity
							xl={this.props.xl}
							decksInfo={this.props.decksInfo} 
							hero={this.props.class} 
							cardInclusions={cardInclusions}
							rarity={this.props.rarity}
							name={this.props.name}
						/>
						:
						<div/>
					}
						
					</div>
				<div className='text-center'>
					{/* <CardCardset cardset={this.props.cardset} /> */}
				</div>
					<CardImage image={this.props.image} artist={this.props.artist}/>
				<hr/>
				<div className='bottom-card-container'>
					<CardRarity rarity={this.props.rarity} type={this.props.type} />					
					<CardFlavor flavor={this.props.flavor} />											
					{ (this.props.type === 'Minion' && this.props.cardset !== 'Knights of the Frozen Throne' && this.props.cardset !== 'Kobolds & Catacombs') ? (<CardSoundBoard cardId={this.props.cardId} name={this.props.name} dbfId={this.props.dbfId}/>) : null }
				</div>
			</div>
		)
	}	
}