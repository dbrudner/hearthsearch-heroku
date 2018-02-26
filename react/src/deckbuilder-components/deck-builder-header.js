import React,{ Component } from 'react'
import DeckStats from './deck-builder-stats'

import _ from 'lodash'

export default class DeckHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deck: []
        }
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.card.name && nextProps.card.rarity) {
            var currentDeck = this.state.deck
            var newCard = nextProps.card
            newCard.quantity = 1;

            var incomingCard = [newCard]

            for (var i=0; i<currentDeck.length; i++) {
                if (currentDeck[i].name === newCard.name && currentDeck[i].quantity < 2 && newCard.rarity !== 'Legendary') {
                    currentDeck[i].quantity = 2
                }
            }



            var newDeck = currentDeck.concat(incomingCard) 

            var removedDuplicates = _.uniqBy(newDeck, 'name');

            this.setState(() => {
                return {deck: removedDuplicates}
            })

        }
    }

    render() {
        return (
            <div className='deck-header-container'>
                <div className='row'>
                    <div className='col-md-10'>
                        <DeckStats />
                    </div>
                    <div className='col-md-2 mana-chart-container'>
                        <div className='mana-chart-header'>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}