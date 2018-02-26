import React from 'react'

export default function CardQuantity(props) {

    let quantity = props.deck.map(card => {
        if (card.name === props.name) {
            return card.quantity
        }
    })

    quantity = quantity.filter(value => {
        return value
    })


    if (quantity > 0) {
        return (
            <div className='text-center quantity-added'>
                Added {quantity[0]}
            </div>
        ) 
    }

    else {
        return (
            <div className='text-center quantity-added invisible'>
                None added
            </div>
        )
    }

    
}