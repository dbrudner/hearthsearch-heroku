import React from 'react'
import CardRarity from './card-rarity'

export default function CardBasicInfo(props) {

    console.log(props.card.rarity)

    return (
        <div className='text-center'>
            <span className='card-class'>
                {props.card.class}
            </span>
            <span className='card-class'>
                {props.card.type}
            </span>
            <span>
                <CardRarity rarity={props.card.rarity} />
            </span>
        </div>
    )
}