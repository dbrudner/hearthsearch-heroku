import React from 'react'
import { Link } from 'react-router-dom'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import _ from 'lodash'
import CardCardset from '../card-components/card-cardset'
import CardPopularity from '../card-components/card-popularity'
import axios from 'axios'
import { Modal } from 'react-bootstrap'


export default class DeckSearchResults extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            deckString: '',
            showModal: false
        }
    }

    render() {

        const getDeckstring = id => {

            console.log('hi')

            axios.get(`/api/export/${id}`)
            .then(result => {
                this.setState({
                    deckString: result.data,
                    showModal: true
                })
            })
        }
    
        const handleClose = () => {
            this.setState({
                showModal: false
            })
        }

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
        
    
        const DeckList = deck => {
    
            let sorted = _.orderBy(deck, '_id.cost', 'asc')
    
    
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
    
        const renderResults = (results) => {
            
            return results.map(result => {
                
                let hero = result.hero
                hero = hero.charAt(0).toUpperCase() + hero.slice(1)
    
                const deckList = () => {
    
    
                    return (
                        <Popover className='deck-search-deck-list' id="popover-positioned-left">
                            <div>
                                {DeckList(result.cards)}
                            </div>
                        </Popover>
                    )
                }
    
                return (
                    <div className='panel deck-panel' key={result._id}>
                        <div className='deck-box'>
                            <div>
                                <div className='deck-box-name'>
                                    <Link to={`deck/${result._id}`}>{result.name}</Link>
                                </div>
                                <div className='deck-list-src'>
                                    {result.source === 'HearthPwn' ?
                                        <div>
                                            <strong>
                                                <a target='_blank' href={`https://www.hearthpwn.com/members/${result.user}`}>{result.user}</a>
                                            </strong> 
                                            <span> from </span>
                                            <a target='_blank' href={`https://www.hearthpwn.com/members/${result.user}`}>
                                                <span className='hearthpwn'>{result.source}</span>
                                            </a>
                                        </div>                                                                   
                                        : 
                                        <span className='hearthtato'> HearthTato</span>
                                    }
    
                                </div>
                                <div className='quick-peek'>
                                    <OverlayTrigger trigger='click' placement='right' overlay={deckList()}>
                                        <span className="btn btn-info hvr-fade">
                                            <span className="glyphicon glyphicon-folder-open"></span>
                                            <span className='smlleftmrg'>Expand Deck List</span>
                                        </span>
                                    </OverlayTrigger>
                                    <span className="btn deckstring-btn" onClick={() => getDeckstring(result._id)}>
                                        <span className="glyphicon glyphicon-share"></span> 
                                        <span> Export </span>
                                    </span>
                                </div>
                                
                            </div>
                            <div>
                                <div>
                                    <span className={result.hero + ' deckbox-hero'}>{hero} - </span>
                                    <span className='deckbox-archetype'>{result.archetype}</span>
                                </div>
                            </div>
                            
                        </div>
    
                    </div>
                )
            })
        }
    
        return (
            <div className=''>
                <Modal show={this.state.showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deck String</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='deckstring'>
                        {this.state.deckString || 'Loading'}
                    </div>
                </Modal.Body>
                </Modal>
                {renderResults(this.props.matches)}
            </div>
        )
    }

    
}