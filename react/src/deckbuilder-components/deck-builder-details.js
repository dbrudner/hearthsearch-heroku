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
			deckName: '',
			archetype: '',
			description: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        console.log('nextProps')
        
    }

    handleChange = (event, name) => {
        this.setState({
            [name]: event.target.value
        })
    }

    componentDidMount() {


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

    handleSubmit = event => {
        event.preventDefault()

        const data = {
            name: this.state.deckName,
            archetype: this.state.archetype,
            cards: this.state.deck,
            format: this.props.format,
            user: this.props.username,
            source: 'HearthSearch',
            hero: this.props.hero
        }

        axios.post('/newdeck', data)
        .then(res => console.log(res))

    }
    
    
    render() {

        const getQuantity = (deck) => {
            return deck.reduce((a, card) => {
                return card.quantity + a
            }, 0)
        }

        const totalCards = getQuantity(this.props.deck)


        const submit = () => {
            console.log(totalCards)

            if (totalCards === 3) {
                return (
                    <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                )
            }

            else {
                return (
                    <div>
                        Must have 30 cards to submit
                    </div>
                )
            }
        }

        const archetypes = this.state.archetypes.map(archetype => {
            
                return (
                    <option value={archetype}>
                        {archetype}
                    </option>
                )
        })


        return (
            <div className='dd-cntr'>
                <div className='deckinfohdr'>Deck Info</div>
                <div className='deck-details-form'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <input value={this.state.deckName} onChange={(event) => {this.handleChange(event, 'deckName')}} name='deckName' className='form-control' placeholder='Deck Name' />
                        </div>
                        <div>
                            <select className="form-control" onChange={(event) => {this.handleChange(event, 'archetype')}}>
                                <option className='placeholder' value="None">Archetype</option>
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
                        <div>
                            {submit()}
                        </div>
                    </form>
                </div>
            </div>
        )
    } 
    
}