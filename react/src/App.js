import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Home from './home'
import DeckBuilder from './deck-builder'
import ChooseClass from'./choose-class'
import Signup from './signup'
import Login from './login'
import Logout from './logout'
import SingleDeck from './single-deck-components/single-deck'
import DeckSearch from './deck-search-components/deck-search'
import Profile from './profile-components/profile'
import DeckBuilderDetailsForm from './deckbuilder-components/deck-builder-details-form'
import DeckImporter from './deck-import-components/deck-import'
import Nav from './nav-components/nav'
import './animate.css'
import './hover.css'
import Banner from './banner'


const App = () => {
    return (
        
        <Router>
            <div>
                <Nav/>
            <div className='container-fluid'>
                
                <Route exact path='/' component={Home} />
                <Route exact path='/search' component={Home} />
                <Route exact path='/build/:class' component={DeckBuilder} />
                <Route exact path='/import' component={DeckImporter} />                
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/profile/:userId' component={Profile} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} />
                <Route exact path='/build' component={ChooseClass} />
                <Route exact path='/deck/:deckId' component={SingleDeck} />
                <Route exact path='/decks' component={DeckSearch} />
                <Route exact path ='/deck/page2/:class/:deckId' component={DeckBuilderDetailsForm} />                                                                                                                              
            </div>
            </div>
        </Router>
    )
}

export default App;