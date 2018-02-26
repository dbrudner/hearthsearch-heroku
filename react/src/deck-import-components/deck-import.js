import React,{Component} from 'react'
import axios from 'axios'
import DeckBuilder from '../deck-builder'
import DeckBuilderList from '../deckbuilder-components/deck-builder-list'
import {Modal} from 'react-bootstrap'

import { Redirect } from 'react-router-dom';

export default class DeckImport extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            deck: [],
            deckString: '',
            format: 'standard',
            quantity: 0,
            modal: true,
            reDirect: null
        }
    }

    handleImportClose = () => {
        console.log('hi')
        this.setState({
            modal: false,
            reDirect: '/'
        })
    }

    handleChange = (event) => {
		this.setState({ deckString: event.target.value });
	}

	handleSubmit = (event) => {

        event.preventDefault();

        const getQuantity = (deck) => {
			return deck.reduce((a, card) => {
				return card.quantity + a
			}, 0)
		}

        let deckString = this.state.deckString
        deckString = deckString.replace('/', '$')
        console.log(deckString)
        axios.get(`/api/import/${deckString}`)
        .then(result => {
            console.log(result)
            let deckString = result.data.cards
            let hero = result.data.heroes[0]

            if (hero === 893 || hero === 47817) {
                this.setState({
                    hero: 'Warlock'
                })
            }
            if (hero === 31 || hero === 2826) {
                this.setState({
                    hero: 'Hunter'
                })
            }
            if (hero === 637 || hero === 39117) {
                this.setState({
                    hero: 'Mage'
                })
            }
            if (hero === 40195 || hero === 930) {
                this.setState({
                    hero: 'Rogue'
                })
            }
            if (hero === 274) {
                this.setState({
                    hero: 'Druid'
                })
            }
            if (hero === 1066 || hero === 40183) {
                this.setState({
                    hero: 'Shaman'
                })
            }
            if (hero === 813 || hero === 41887) {
                this.setState({
                    hero: 'Priest'
                })
            }
            if (hero === 671 || hero === 2827 || hero === 46116) {
                this.setState({
                    hero: 'Paladin'
                })
            }
            if (hero === 7 ||hero === 2828) {
                this.setState({
                    hero: 'Warrior'
                })
            }

            let newDeck = deckString.forEach(ds => {
                axios.get(`/blah/${ds[0]}`)
                .then(result2 => {
                    result2.data.quantity = ds[1]
                    console.log(result2)
                    result2.data.mana = result2.data.cost

                    console.log(result2)

                    this.setState({
                        deck: [...this.state.deck, result2.data]                        
                    })
                }).then(() => {
                    this.state.deck.forEach(card => {
                        if (card.cardSet === "Basic" || card.cardSet === "Classic" || card.cardSet === "Journey to Un'Goro" || card.cardSet === "Kobolds & Catacombs" || card.cardSet === "Mean Streets of Gadgetzan" ||  card.cardSet === "One Night in Karazhan" || card.cardSet === "Knights of the Frozen Throne" || card.cardSet === "Whispers of the Old Gods") {
                            return
                        } else {
                            this.setState({
                                format: 'wild'
                            })
                            return
                        }
                    })
                }).then(() => {
                    this.setState({quantity: getQuantity(this.state.deck)})
                }).then(() => {
                    this.setState({
                        modal: false
                    })
                })
            })
            
        })

	}
	
	render() {

        if (this.state.reDirect) {
            return <Redirect to={{ pathname: this.state.reDirect }} />
        }

		return (
            <div>
                <Modal show={this.state.modal} onHide={this.handleImportClose}>
                    <div className='import-cntr'>
                
                    <div className='import-hdr'>
                        Import a Deck
                    </div>
                    {this.state.deck.length === 0 ? <div className='search-bar form-group'>
                        <form onSubmit={this.handleSubmit} >
                            <div className=''>
                                <div className=''>
                                    <input className='form-control' type="text" name="term" onChange={this.handleChange}/>													
                                </div>
                                <div className='text-center'>
                                {this.state.deckString.length > 40 ? 
                                    <button type='submit' className='import-btn btn btn-primary'>Submit</button>							                             
                                :
                                <button disabled className='import-btn btn btn-danger'>Invalid Deck String</button>	
                                }
                                </div>
                            </div>
                        </form>
                    </div>
                    :
                    <div></div>}
                    </div>
                </Modal>
                    
                    {this.state.quantity === 30 ? <DeckBuilder imported format={this.state.format} hero={this.state.hero} deck={this.state.deck}/> : <div></div>}
            </div>
		)
	}
}