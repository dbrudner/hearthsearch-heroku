import React, {Component} from 'react'
import axios from 'axios'
import _ from 'lodash'

export default class DeckBuilderDetails extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            deckName: '',
            deck: this.props.deck,
            decks: [],
            archetypes: [],
            description: '',
            redirectTo: null,
            quantity: this.props.quantity || 0
        }
    }

    componentDidMount() {

        console.log(this.props.cards)

        axios.get('/api/decks')
        .then((result) => {

            let archetypes = result.data.map(deck => {
                return deck.archetype
            })

            archetypes = _.uniq(archetypes)
            archetypes = archetypes.filter(archetype => {
                return archetype !== 'archetype'
            })


            this.setState({
                decks: result.data,
                archetypes
            })
        })
        .then(() => {
        })
    }
    
    
    render() {

        const archetypes = this.state.archetypes.map(archetype => {
            return (
                <option value={archetype}>
                    {archetype}
                </option>
            )
        })

        console.log(this.state.quantity)
        console.log(this.state.deck)

        return (
            <div>
                <div className='deckinfohdr'>Deck Info</div>
                <div className='deck-details-form'>
                    <div className='form-group'>
                        <input onChange={(event) => {this.handleChange(event, 'deckName')}} name='deckName' className='form-control' placeholder='Deck Name' />
                    </div>
                    <div>
                        <select className="form-control" onChange={(event) => {this.handleChange(event, 'archetype')}}>
                            <option value="None">Archetype</option>
                            <option value="Aggressive Face">Aggressive Face</option>
                            <option value="Aggressive Board Control">Aggressive Board Control</option>
                            <option value="Midrange">Midrange</option>
                            <option value="Control">Control</option>
                            <option value="Miracle">Miracle</option>                    
                            <option value="One Turn Kill">One Turn Kill</option>
                            <option value="Fatigue">Fatigue</option>
                            {archetypes}
                        </select>
                    </div>
                    <div className="form-group desc">
                        <textarea placeholder='Description' onChange={(event) => {this.handleChange(event, 'description')}} className="form-control" rows="5" id="comment"></textarea>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    } 
    
}