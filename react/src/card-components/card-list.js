import React from 'react'
import CardImage from './card-image'
import CardInfo from './card-info'
import CardPopularity from './card-popularity'
import DeckBuilderCardInfo from './deck-builder-card-info'

import _ from 'lodash'
import axios from 'axios'

import { BeatLoader } from 'react-spinners';

export default class CardList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			totalMatches: "",
			matches: [],
			term: '',
			hero: this.props.hero,
			totalRendered: this.props.render,
			preventUpdate: false,
			decksInfo: null
		}

		this.search = this.search.bind(this);
	}

	componentWillReceiveProps(nextProps) {


		if (nextProps) {
			this.setState({
				term: nextProps.term,
				totalRendered: this.props.render,
				hero: nextProps.hero
				
			}, () => {
				this.search(nextProps)				
			})
		}

	}

	componentDidMount() {

		axios.get('/api/decks/classes')
		.then(result => {

			const decks = result.data

			const parseDecks = (decks, hero) => {
				return decks.reduce((a, deck) => {
					if (deck.hero.toLowerCase() === hero) {
						return a + 1
					} else {
						return a
					}
				}, 0)
			}

			const wildDecks = decks.filter(deck => deck.format === 'wild')
			const standardDecks = decks.filter(deck => deck.format === 'standard')
			


			const decksInfo = {
				standard: {
					druid: parseDecks(standardDecks, 'druid'),
					hunter: parseDecks(standardDecks, 'hunter'),
					mage: parseDecks(standardDecks, 'mage'),
					paladin: parseDecks(standardDecks, 'paladin'),
					priest: parseDecks(standardDecks, 'priest'),
					rogue: parseDecks(standardDecks, 'rogue'),
					shaman: parseDecks(standardDecks, 'shaman'),
					warlock: parseDecks(standardDecks, 'warlock'),
					warrior: parseDecks(standardDecks, 'warrior')
				},

				wild: {
					druid: parseDecks(wildDecks, 'druid'),
					hunter: parseDecks(wildDecks, 'hunter'),
					mage: parseDecks(wildDecks, 'mage'),
					paladin: parseDecks(wildDecks, 'paladin'),
					priest: parseDecks(wildDecks, 'priest'),
					rogue: parseDecks(wildDecks, 'rogue'),
					shaman: parseDecks(wildDecks, 'shaman'),
					warlock: parseDecks(wildDecks, 'warlock'),
					warrior: parseDecks(wildDecks, 'warrior')
				}
			}

			this.setState({
				decksInfo
			})

		})

		if (this.props.cards) {
			this.search()
		}
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	  }


	getCard = (card, cardObj) => {
		this.setState({
			preventUpdate: true
		})
		this.props.getCard(card);
	}
	
	search = (filters) => {

		const thisProps = this.props

		const nameMatches = this.props.cards.filter(item => {
			return item.name.toLowerCase().match(this.state.term.toLowerCase())
		})

		const textMatches = thisProps.cards.filter(item => {
			if (item.text) {
				return item.text.toLowerCase().match(this.state.term.toLowerCase())				
			} else {
				return false				
			}
		})

		let matches = [...nameMatches, ...textMatches]

		if (thisProps.ability && thisProps.ability !== 'None') {
			matches = matches.filter(card => {
				if (card.text) {
					return card.text.toLowerCase().match(thisProps.ability.toLowerCase())													
				} else {
					false
				}
			})
		}

		if (thisProps.ability2 && thisProps.ability2 !== 'None') {
			matches = matches.filter(card => {
				if (card.text) {
					return card.text.toLowerCase().match(thisProps.ability2.toLowerCase())													
				} else {
					false
				}
			})
		}

		if (thisProps.type && thisProps.type !== 'None') {
			matches = matches.filter((card) => {
				return card.type === thisProps.type
			})
		}

		if (thisProps.rarity && thisProps.rarity !== 'None') {
			matches = matches.filter((card) => {
				return card.rarity === thisProps.rarity
			})
		}



		if (thisProps.cardSet && thisProps.cardSet !== 'None') {
			console.log(thisProps.cardSet)

			matches = matches.filter((card) => {
				return card.cardSet === thisProps.cardSet;
			})
		}

		if (thisProps.mana && thisProps.mana !== 'None') {

			if (thisProps.mana === ">10") {
				matches = matches.filter((card) => {
					return card.cost > 10;
				})
			}


			matches = matches.filter((card) => {
				return card.cost === parseInt(thisProps.mana, 10);
			})
		}

		if (thisProps.attack && thisProps.attack !== 'None') {

			if (thisProps.attack === ">10") {
				matches = matches.filter((card) => {
					return card.attack > 10;
				})
			}
			matches = matches.filter((card) => {
				return card.attack === parseInt(thisProps.attack, 10);
			})
		}

		if (thisProps.health && thisProps.health !== 'None') {

			if (thisProps.health === ">10") {
				matches = matches.filter((card) => {
					return card.health > 10;
				})
			}

			matches = matches.filter((card) => {
				return card.health === parseInt(thisProps.health, 10);
			})
		}

		if (thisProps.minMana && thisProps.minMana !== 'None') {
			matches = matches.filter((card) => {
				return card.cost >= thisProps.minMana;
			})
		}

		if (thisProps.maxMana && thisProps.maxMana !== 'None') {

			matches = matches.filter((card) => {
				return card.cost <= thisProps.maxMana;
			})
		}

		if (thisProps.minAttack && thisProps.minAttack !== 'None') {
			matches = matches.filter((card) => {
				return card.attack >= thisProps.minAttack;
			})
		}

		if (thisProps.maxAttack && thisProps.maxAttack !== 'None') {
			matches = matches.filter((card) => {
				return card.attack <= thisProps.maxAttack;
			})
		}

		if (thisProps.minHealth && thisProps.minHealth !== 'None') {
			matches = matches.filter((card) => {
				return card.health <= thisProps.minHealth;
			})
		}

		if (thisProps.minHealth && thisProps.minHealth !== 'None') {
			matches = matches.filter((card) => {
				return card.health <= thisProps.minHealth;
			})
		}
		

		if (this.props.gameFormat) {
			if (thisProps.gameFormat.toLowerCase() === "standard") {
				matches = matches.filter((card) => {
					return card.cardSet === "Basic" || card.cardSet === "Classic" || card.cardSet === "Journey to Un'Goro" || card.cardSet === "Kobolds & Catacombs" || card.cardSet === "Mean Streets of Gadgetzan" ||  card.cardSet === "One Night in Karazhan" || card.cardSet === "Knights of the Frozen Throne" || card.cardSet === "Whispers of the Old Gods"
				})
			}
		}
		

		

		if (thisProps.tribe && thisProps.tribe !== 'None') {
			matches = matches.filter(function(card) {
				console.log(card)
				console.log(thisProps.tribe)				
				return card.race === thisProps.tribe;
			})
		}


		if (this.props.buildMode) {
			if (thisProps.hero && thisProps.hero !== 'None') {
				matches = matches.filter(function(card) {
					return card.playerClass === thisProps.hero || card.playerClass === "Neutral";
				})
			}
		}

		if (!this.props.buildMode) {
			if (thisProps.hero && thisProps.hero !== 'None') {
				matches = matches.filter(function(card) {
					return card.playerClass === thisProps.hero ;
				})
			}
		}

		if (this.props.nameSort === 'Mana') {
			matches = _.orderBy(matches, 'cost', 'asc')
			
		}

		if (this.props.nameSort === 'Mana' && this.props.sortingMethod == 'Descending') {
			matches = _.orderBy(matches, 'cost', 'desc')
			
		}

		if (this.props.nameSort === 'Name') {
			matches = _.orderBy(matches, 'name', 'asc')
			
		}

		if (this.props.nameSort === 'Name' && this.props.sortingMethod == 'Descending') {
			matches = _.orderBy(matches, 'name', 'desc')
		
		}

		if (this.props.nameSort === 'LightForge Score') {
			matches = matches.filter(card => {
				return card.lightForgeScore[0]
			})

			matches = _.orderBy(matches, card => {
				return card.lightForgeScore[0].Score;
			}, ['desc']);

		}

		if (this.props.nameSort === 'LightForge Score' && this.props.sortingMethod == 'Ascending') {


			matches = matches.filter(card => {
				return card.lightForgeScore[0]
			})

			matches = _.orderBy(matches, card => {
				return card.lightForgeScore[0].Score;
			}, ['asc']);

		
		}

		if (this.props.nameSort === 'Name' && this.props.sortingMethod == 'Descending') {
			matches = _.orderBy(matches, 'name', 'desc')
		}
		if (this.props.nameSort === "Wild Usage") {
			const allDecks = this.state.decksInfo.wild

			
			matches.sort((cardA, cardB) => {
				

				let totalWildDecks = 0
				let wildDecksCardA = 0
				let wildDecksDeckB = 0
				
				let inclusionsRateCardA;
				let inclusionsRateCardB;

				const cardAHero = cardA.playerClass.toLowerCase()
				const cardBHero = cardB.playerClass.toLowerCase()
				

				{
					for (let key in allDecks) {
						totalWildDecks = totalWildDecks + allDecks[key]
					}
					
					
					if (cardA.playerClass !== 'Neutral') {
						
						const decksWithCard = cardA.inclusionsWild[cardAHero]
						const decksWithSameClass = allDecks[cardAHero]
						

						inclusionsRateCardA = decksWithCard/decksWithSameClass
	
						if (decksWithSameClass === 0) {
							inclusionsRateCardA = 0
						}

						if (cardA.rarity !== 'Legendary') {
							inclusionsRateCardA = inclusionsRateCardA / 2
						}

					}

					if (cardA.playerClass === 'Neutral') {
						let decksWithCard = 0

						for (let key in cardA.inclusionsWild) {
							decksWithCard = decksWithCard + cardA.inclusionsWild[key]
						}

												

						inclusionsRateCardA = decksWithCard/totalWildDecks
						
						// if (cardA.rarity !== 'Legendary') {
						// 	inclusionsRateCardA = inclusionsRateCardA / 2
						// }
					}


				}

				{
					
	
					if (cardB.playerClass !== 'Neutral') {



						const decksWithCard = cardB.inclusionsWild[cardBHero]
						const decksWithSameClass = allDecks[cardBHero]
	
						

						inclusionsRateCardB = decksWithCard/decksWithSameClass
	
						if (decksWithSameClass === 0) {
							inclusionsRateCardB = 0
						}

						if (cardB.rarity !== 'Legendary') {
							inclusionsRateCardB = inclusionsRateCardB / 2
						}
					}

					if (cardB.playerClass === 'Neutral') {
						let decksWithCard = 0

						for (let key in cardB.inclusionsWild) {
							decksWithCard = decksWithCard + cardB.inclusionsWild[key]
						}


						inclusionsRateCardB = decksWithCard/totalWildDecks

						// if (cardB.rarity !== 'Legendary') {
						// 	inclusionsRateCardB = inclusionsRateCardB / 2
						// }
					}

				}
				
				return inclusionsRateCardB - inclusionsRateCardA

			})
		}

		if (this.props.nameSort === "Standard Usage") {

			const allDecks = this.state.decksInfo.standard

			
			matches.sort((cardA, cardB) => {

				let totalStandardDecks = 0
				let standardDecksCardA = 0
				let standardDecksDeckB = 0
				
				let inclusionsRateCardA;
				let inclusionsRateCardB;

				const cardAHero = cardA.playerClass.toLowerCase()
				const cardBHero = cardB.playerClass.toLowerCase()
				

				{
					for (let key in allDecks) {
						totalStandardDecks = totalStandardDecks + allDecks[key]
					}
					
	
					if (cardA.playerClass !== 'Neutral') {
						
						const decksWithCard = cardA.inclusionsStandard[cardAHero]
						const decksWithSameClass = allDecks[cardAHero]
	
						inclusionsRateCardA = decksWithCard/decksWithSameClass
	
						if (cardA.rarity !== 'Legendary') {
							inclusionsRateCardA = inclusionsRateCardA / 2
						}
					}

					if (cardA.playerClass === 'Neutral') {
						let decksWithCard = 0

						for (let key in cardA.inclusionsStandard) {
							decksWithCard = decksWithCard + cardA.inclusionsStandard[key]
						}

												

						inclusionsRateCardA = decksWithCard/totalStandardDecks

						// if (cardA.rarity !== 'Legendary') {
						// 	inclusionsRateCardA = inclusionsRateCardA / 2
						// }
					}


				}

				{
					
	
					if (cardB.playerClass !== 'Neutral') {
						const decksWithCard = cardB.inclusionsStandard[cardBHero]
						const decksWithSameClass = allDecks[cardBHero]
	
						inclusionsRateCardB = decksWithCard/decksWithSameClass
	
						if (cardB.rarity !== 'Legendary') {
							inclusionsRateCardB = inclusionsRateCardB / 2
						}
					}

					if (cardB.playerClass === 'Neutral') {
						let decksWithCard = 0

						for (let key in cardB.inclusionsStandard) {
							decksWithCard = decksWithCard + cardB.inclusionsStandard[key]
						}


						inclusionsRateCardB = decksWithCard/totalStandardDecks

						// if (cardB.rarity !== 'Legendary') {
						// 	inclusionsRateCardB = inclusionsRateCardB / 2
						// }
					}

				}
				

				return inclusionsRateCardB - inclusionsRateCardA

			})
		}

		matches = _.uniqBy(matches, function (e) {
			return e.name;
		  });

		this.setState({
			matches: matches.filter(card => {
				return card.collectible === true
			})
		})

	}

	renderCardList = (cards) => {
		
			
		if (this.props.buildMode) {
			return cards.map(card => {
				let quantity = this.props.deck.map(deckCard => {
					if (deckCard.dbfId === card.dbfId) {
						return deckCard.quantity
					}
				})

				return (
					<div key={card.dbfId} className='col-lg-4 col-md-4 col-xs-4 card-container'>
						<div className='animated fadeIn'>
							<DeckBuilderCardInfo
								wideCards
								key={card.dbfId}
								quantity={quantity[0]}
								deck={this.props.deck}									
								image={card.img}
								decksInfo={this.state.decksInfo} 
								inclusionsWild={card.inclusionsWild}
								inclusionsStandard={card.inclusionsStandard}
								artist={card.artist}
								flavor={card.flavor}
								attack={card.attack}
								health={card.health}
								cardId={card.cardId}
								dbfId={card.dbfId}
								lightForgeScore={card.lightForgeScore}
								name={card.name}
								cost={card.cost}
								type={card.type}
								text={card.text}
								rarity={card.rarity}
								howToGet={card.howToGet}
								howToGetGold={card.howToGetGold}
								class={card.playerClass}
								cardset={card.cardSet}
								getCard={this.getCard}
								buildMode={this.props.buildMode}
								_id={card._id}
							/>
						</div>
					</div>
				)
			})
		}
			else {

				if (this.props.superWide) {
					return cards.map(card => {
						return (
							<div key={card.dbfId} className='col-lg-3'>
								<div className='card-result btm-mrg animated fadeIn'>
									<CardInfo
										xl={this.props.xl}
										deck={this.props.deck}
										image={card.img} 
										artist={card.artist}
										inclusionsWild={card.inclusionsWild}
										inclusionsStandard={card.inclusionsStandard}
										decksInfo={this.state.decksInfo}
										flavor={card.flavor}
										attack={card.attack}
										health={card.health}
										cardId={card.cardId}
										dbfId={card.dbfId}
										lightForgeScore={card.lightForgeScore}
										name={card.name}
										cost={card.cost}
										type={card.type}
										text={card.text}
										rarity={card.rarity}
										howToGet={card.howToGet}
										howToGetGold={card.howToGetGold}
										class={card.playerClass}
										cardset={card.cardSet}
										getCard={this.getCard}
										buildMode={this.props.buildMode}
										_id={card._id}
									/>
								</div>
							</div>
						)
					}) 
				}

				return cards.map(card => {
					return (
						<div key={card.dbfId} className={this.props.largeScreen ? 'col-lg-4 card-container' : 'col-lg-4 col-xs-12 col-md-6 card-container'}>
							<div className='card-result'>
								<CardInfo
									xl={this.props.xl}
									deck={this.props.deck}
									image={card.img} 
									artist={card.artist}
									inclusionsWild={card.inclusionsWild}
									inclusionsStandard={card.inclusionsStandard}
									decksInfo={this.state.decksInfo}
									flavor={card.flavor}
									attack={card.attack}
									health={card.health}
									cardId={card.cardId}
									dbfId={card.dbfId}
									lightForgeScore={card.lightForgeScore}
									name={card.name}
									cost={card.cost}
									type={card.type}
									text={card.text}
									rarity={card.rarity}
									howToGet={card.howToGet}
									howToGetGold={card.howToGetGold}
									class={card.playerClass}
									cardset={card.cardSet}
									getCard={this.getCard}
									buildMode={this.props.buildMode}
									_id={card._id}
								/>
							</div>
						</div>
					)
				}) 
			}
		}

	renderTen = () => {
		this.setState({
			totalRendered: this.state.totalRendered + this.props.render
		})
	}

	onScroll = () => {
		if (
		  (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
		) {
		  this.renderTen();
		}
	}
 	
	render() {

		if (this.props.cards && this.props.buildMode) {
			return (
				<div>
					<div className='build-mode-list cards'>
						<div className='row'>
							{this.renderCardList(this.state.matches.slice(0, this.state.totalRendered))}
						</div>
					</div>
				</div>
			)
		}

		if (this.props.cards) {
			return (
					<div>
						<div className='list-group cards'>
							<div className='row'>
								{this.renderCardList(this.state.matches.slice(0, this.state.totalRendered))}
							</div>
						</div>
					</div>
				)
		}

		

		if (!this.props.cards) {
			return (
				<div className='loader-cntr center-block text-center'>
					<BeatLoader
						size={15}
						margin='2px'
					/>	
				</div>
			)
		}
	}
}