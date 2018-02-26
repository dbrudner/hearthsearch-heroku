import React, { Component } from 'react'
import _ from 'lodash'
import axios from 'axios'

import DeckCardName from './deck-builder-card-name'
import DeckManaChart from './deck-builder-mana-chart'
import DeckDust from './deck-builder-dust'
import DeckCardsLeft from './deck-builder-cards-left'
import Submit from './deck-builder-submit'
import DeckAverageMana from './deck-average-mana'


export default class Deck extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deck: [],
            userId: '',
            dust: 0,
        }
    }

    getManaCurve(deck) {
        return ((deck.reduce((a, card) => {

            if (card.mana) {
                return card.mana + a
            }

            if (card.cost) {
                
                return card.cost + a
            }

        }, 0))/(deck.length)).toFixed(2)
    }

    getDust(array) {
        return array.reduce((a, card) => {

    
            if (card.rarity === 'Free') {
                return a + 0
            }
    
            if (card.rarity === 'Common') {
                if (card.quantity === 2) {
                    return a + 80
                }
                return a + 40
            }
    
            if (card.rarity === 'Rare') {
                if (card.quantity === 2) {
                    return a + 200
                }
                return a + 100
            }
    
            if (card.rarity === 'Epic') {
                if (card.quantity === 2) {
                    return a + 800
                }
                return a + 400
            }
    
            if (card.rarity === 'Legendary') {
                return a  + 1600
            } else {
                return 0
            }
    
            }, 0)
    }

    openModal = () => {
        console.log('hi')
        this.props.openModal()
    }

    removeCard = toBeRemoved => {

        
        this.props.removeCard(toBeRemoved)


    }

    componentDidMount() {



        const getQuantity = (deck) => {
            return deck.reduce((a, card) => {
                return card.quantity + a
            }, 0)
        }

        this.setState({
            quantity: getQuantity(this.props.deck)
        })

        axios.get('/test')
        .then((response) => {
            this.setState({
                userId: response.data._id
            })
        })

        

    }

    render() {

        const getQuantity = (deck) => {
            return deck.reduce((a, card) => {
                return card.quantity + a
            }, 0)
        }


        const totalCards = getQuantity(this.props.deck)


        let sorted = _.orderBy(this.props.deck, 'mana', 'asc')

        const cardDeck = sorted.map(card => {
            return (
                <DeckCardName key={card.dbfId} removeCard={this.removeCard} mana={card.mana || card.cost} quantity={card.quantity} dbfId={card.dbfId} name={card.name} rarity={card.rarity} cardId={card.cardId}/>
            )
        })

 
        
            return (
                <div className=''>
                    <div className='yr-deck-hdr'>
                        <div>
                            <DeckCardsLeft deck={this.props.deck} />
                        </div>
                        <div>
                            <button onClick={this.openModal} className='btn next-page-btn-fail hvr-fade animated fadeIn'><span className='submit-btn-text'>Enter Details and Submit</span></button>                       
                        </div>
                    </div>
                        <DeckManaChart deck={this.props.deck} curve={this.state.curve}/>
                    <div className='bldr-card-deck-cntr'>
                        {cardDeck}
                    </div>
                </div>
            ) 
        
    }
}