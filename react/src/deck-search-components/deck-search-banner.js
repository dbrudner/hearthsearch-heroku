import React from 'react'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import DeckSearchbar from './deck-searchbar'
import {PieChart, ToolTip} from 'react-easy-chart'


export default class DeckSearchBanner extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            dataDisplay: '',
            totalWildDecks: 0,
            totalStandardDecks: 0,
            showToolTip: false,
            value: null
        }
    }

    mouseMoveHandler(e) {
        if (this.state.showToolTip) {
          this.setState({top: e.y, left: e.x});
        }
    }

    
    mouseOverHandler = (d, e) => {
        this.setState({
            showToolTip: true,
            top: e.clientY,
            left: e.clientX,
            value: d.value,
            key: d.data.key});
    }

  mouseMoveHandler = e => {

    if (this.state.showToolTip) {
        this.setState({top: e.clientY, left: e.clientX});
    }
  }

  mouseOutHandler = () => {
    this.setState({showToolTip: false});
  }

  createTooltip = () => {
    if (this.state.showToolTip) {
        return (
            <div className='text-center'>
                <strong><span className={this.state.key.toLowerCase()}>{this.state.key}</span></strong>
                : {this.state.value.toFixed(2)}%
            </div>
        );
    } else {
        return (
            <div className='text-center invisible'>
                Class: Value
            </div>
        )
    }
    
  }

    componentWillReceiveProps(nextProps) {


        const decks = nextProps.decks        

        const totalWildDecks = decks.reduce((acc, deck) => {
            if (deck.format === 'wild') {
                return acc + 1
            } else {
                return acc
            }
        }, 0)

        const totalStandardDecks = decks.reduce((acc, deck) => {
            if (deck.format === 'standard') {
                return acc + 1
            } else {
                return acc
            }
        }, 0)

        this.setState({
            totalWildDecks,
            totalStandardDecks
        })

    }

    render() {


        const decks = this.props.decks


        const decksByClass = format => {

            const classes = ["Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"].sort()

            if (format) {
                const render = () => {

                    const sumOfAllDecks = decks.reduce((acc, deck) => {
                        if (deck.format.toLowerCase() === format) {
                            return acc = acc + 1
                        } else {
                            return acc
                        }
                    }, 0)


                    const data = classes.map(hero => {

                        const sumOfDecks = decks.reduce((acc, deck) => {
                            if (deck.hero.toLowerCase() === hero.toLowerCase() && deck.format.toLowerCase() === format) {
                                return acc = acc + 1
                            } else {
                                return acc
                            }
                        }, 0)
        
                        let value = ((sumOfDecks/sumOfAllDecks) * 100)
                        


                        return (
                            {
                                key: hero,
                                value: value
                            }
                        )

                    })

                    return (
                        <div className='pi-pad'>
                            <PieChart 
                                data={data} 
                                size={200} 
                                innerHoleSize={100}
                                mouseOverHandler={this.mouseOverHandler}
                                mouseOutHandler={this.mouseOutHandler}
                            />
                        </div>
                    )
                }
                return (
                    <div>
                        {render()}
                        {this.createTooltip()}                        
                    </div>
                )
            } else {
                const render = () => {
                    const data = classes.map(hero => {
        
                        const sumOfAllDecks = decks.reduce((acc, deck) => {
                            return acc + 1
                        }, 0)
                        


                        const sumOfDecks = decks.reduce((acc, deck) => {
                            if (deck.hero.toLowerCase() === hero.toLowerCase()) {
                                return acc = acc + 1
                            } else {
                                return acc
                            }
                        }, 0)
        
                        let value = ((sumOfDecks/sumOfAllDecks) * 100)

                        return (
                            {
                                key: hero,
                                value
                            }
                        )
                    })
                    return (
                        <div className='pi-pad'>
                            <PieChart 
                                data={data} 
                                size={200} 
                                innerHoleSize={100}
                                mouseOverHandler={this.mouseOverHandler}
                                mouseOutHandler={this.mouseOutHandler}
                            />
                        </div>
                    )
                }
        
                    return (
                        <div>
                            {render()}
                            {this.createTooltip()}
                        </div>
                    ) 
                
                
            }

            
        }

        const popOverClasses = format => {

            
            return (
                <Popover id="popover-positioned-left">
                    {decksByClass(format)}
                    <div className='text-center'>
                        {this.state.dataDisplay || null}
                    </div>
                </Popover>
            )
        }

        decksByClass()

        if (this.state.totalWildDecks) {
            return (
                <div onMouseMove={this.mouseMoveHandler} className='deck-search-panel'>
                    
                    <div className='deck-search-hdr'>
                        Deck Search
                    </div>
                    <div className='text-center'>
                        <DeckSearchbar getFilter={this.props.getFilter} />
                    </div>
                    <div className='deck-totals'>
                        <span className='cursor'>
                            <OverlayTrigger trigger='click' placement='left' overlay={popOverClasses('wild')}>
                                <span>
                                    Total Wild Decks: {this.state.totalWildDecks}
                                </span>
                            </OverlayTrigger>
                        </span>
                        <span className='cursor left-mrg'>
                            <OverlayTrigger trigger='click' placement='right' overlay={popOverClasses('standard')}>
                                <span>
                                    Total Standard Decks: {this.state.totalStandardDecks}
                                </span>
                            </OverlayTrigger>
                        </span>
                    </div>
                    <div className='text-center total-res'>
                        <OverlayTrigger trigger='click' placement='bottom' overlay={popOverClasses()}>
                            <span className='cursor'>
                                    Total Results: {this.props.totalResults}
                            </span>
                        </OverlayTrigger>
                    </div>
                </div>
            )
        } else {
            return <div/>
        }

        
    }

    
}