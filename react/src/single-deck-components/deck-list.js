import React from 'react'
import {OverlayTrigger, Popover} from 'react-bootstrap'
import _ from 'lodash'
import DeckManaChart from './single-deck-mana-chart'

export default function DeckList(props) {
    const cardInfoPopover = card => {
        return (
            <Popover>
                <div>
                    <div className='hollow-box'>
                        <img className='popover-cardimg' src={card.img} />
                    </div>
                    <div>
                        
                    </div>
                </div>
            </Popover>
        )
    }
    
    
    const RenderDeckList = deck => {
    
        let sorted = deck
    
        sorted = _.orderBy(sorted, '_id.cost', 'asc')
        
    
        return sorted.map(cardObj => {
    
    
            const card = cardObj._id
            const quantity = cardObj.cardQuantity
    
            var source = `https://art.hearthstonejson.com/v1/tiles/${card.cardId}.png`
        
            const mana = () => {
        
                if (!card.cost) {
                return <div className='card-deck-list-mana'>0</div>                        
                }
        
        
                if (card.cost === 0) {
                    return <div className='card-deck-list-mana'>0</div>                        
                }
        
                if (card.cost >= 10) {
                    return <div className='card-deck-list-mana-10'>{card.cost}</div>                        
                }
        
                if (card.cost) {
                    return <div name={card.name} className='card-deck-list-mana'>{card.cost}</div>
                }
                
            }
        
            return (
                <div className='deck-search-list-ctr' key={card.cardId}> 
                    <OverlayTrigger trigger='click' placement='right' overlay={cardInfoPopover(card)}>
                        <div className='' name={card.card} className='deck-list-tile-container'>
                            <div>
                                <span  className='deck-list-cn'>
                                {card.name} {(quantity === 2) ? (<span className=''>x{quantity}</span>) : null}
                                </span>
                            <div className='deck-card-tile center-block' name={card.card}>
                                <div className='deck-gray-box' name={card.card} >
                                    {mana()}
                                </div>
                                <div className='tile-img-cntr' name={card.card} >
                                    <img name={card.name} alt={`${quantity} ${card.name}`} className='deck-card-tile' src={source} />
                                </div>
                            </div> 
                            </div>
                        </div>
                    </OverlayTrigger>
                </div>
            )
        })
    }

    return (
        <div>
            <DeckManaChart deck={props.deck} />
            {RenderDeckList(props.deck)}
        </div>
    )
}

