import React from 'react'

import DeckSearchFilters from './deck-search-filters'
import DeckSearchResults from './deck-search-results'
import DeckSearchBanner from './deck-search-banner'

export default function DeckSearchRow(props) {

    return (
        <div className='row'>
            <div className='col-lg-3'>
                <DeckSearchFilters archetypes={props.archetypes} getFilter={props.getFilter}/>
            </div>
            <div className='col-lg-9'>
                <DeckSearchBanner totalResults={props.totalResults} getFilter={props.getFilter} decks={props.decks}/>
                <DeckSearchResults matches={props.matches}/>
            </div>
        </div>
    )
}