import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Link } from 'react-router-dom'


import Searchbar from '../searchbar'
import DeckSearchResults from './deck-search-results'
import DeckSearchBanner from './deck-search-banner'
import DeckSearchRow from './deck-search-row'
import { BeatLoader } from 'react-spinners';


export default class DeckSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            term: '',
            decks: [],
            cards: [],
            matches: [],
            renderMatches: [],
            renderCount: 10,
            archetypes: []
        }
    }

    getFilter = (filterName, filterValue) => {
		this.setState({
			[filterName]: filterValue
        }, () => {
            this.renderSearchResults()            
        })
	}

    componentDidMount = () => {
        axios.get('/api/decks/populate')
        .then(result => {

            let archetypes = result.data.map(deck => {
                return deck.archetype
            }).sort()

            archetypes = _.uniq(archetypes)


            this.setState({
                decks: result.data,
                archetypes
            })
        }).then (() => {
            this.renderSearchResults()
        })

        window.addEventListener('scroll', this.onScroll, false);

    }

    componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
    }

    renderSearchResults= () => {


        let decks = this.state.decks

        if (this.state.term) {
            decks = decks.filter(deck => {
                return deck.name.toLowerCase().includes(this.state.term.toLowerCase())
            })
        }

        if (this.state.hero) {
            decks = decks.filter(deck => {
                return deck.hero === this.state.hero.toLowerCase()
            })
        }

        if (this.state.format) {
            decks = decks.filter(deck => {
                return deck.format === this.state.format.toLowerCase()
            })
        }

        if (this.state.archetype) {
            decks = decks.filter(deck => {
                return deck.archetype === this.state.archetype
            })
        }

        this.setState({
            matches: decks
        })

        this.setState({
            renderMatches: decks.slice(0, this.state.renderCount)
        })
    }

    renderTen = () => {


        this.setState({
            renderCount: this.state.renderCount + 10,
            renderMatches: this.state.matches.slice(0, this.state.renderCount + 10)
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
        const classes = ["Neutral", "Warrior", "Druid", "Mage", "Hunter", "Priest", "Rogue", "Warlock", "Shaman", "Paladin"].sort()
        const gameFormats = ["Standard", "Wild"]

        

        // Get dropdown of all cards
        let cardsDropdown = this.state.cards.map(card => {
            if (card.name) {
                return (
                    <option value={card.name} key={card.cardId}> {card.name} </option>
                )
            }
        })

        // Get dropdown of all heroes
        let heroes = classes.map(hero => {
            return (
                <option value={hero} key={hero}> {hero} </option>                
            )
        })        

        // Get dropdown of all archetypes
        let archetypes = this.state.decks.map(deck => {
            return deck.archetype
        })

        const totalResults = this.state.matches.length

        if (this.state.decks) {
            return (
                <div>
                    <DeckSearchRow totalResults={totalResults} getFilter={this.getFilter} decks={this.state.decks} archetypes={this.state.archetypes} matches={this.state.renderMatches} getFilter={this.getFilter}/>
                </div>
            )
        } else {
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