import React from 'react'

export default function DeckCardsLeft(props) {

    const getQuantity = (deck) => {
        return deck.reduce((a, card) => {
            return card.quantity + a
        }, 0)
    }


   const totalCards = getQuantity(props.deck)

    if (totalCards === 30) {
        return (
            <div className=''>
                <span className='full-deck'>{totalCards}</span>/30
            </div>
        )
    }


    if (totalCards > 30) {
        return (
            <div className=''>
                <span className='too-many'>{totalCards}</span>/30
            </div>
        )
    }

    if (totalCards) {
        return (
            <div>
                {totalCards}/30
            </div>
        )
    } else {
        return (
            <div>
                0/30
            </div>
        )
    }

    
}