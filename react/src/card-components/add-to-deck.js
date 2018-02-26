import React,{Component} from 'react'

export default class extends Component{

    constructor(props) {
        super(props)

        this.state = {
            clicked: false
        }
    }

    addToDeck(name, mana, rarity, cardSet, hero, dbfId, cardId, _id) {
        this.props.getCard(name, mana, rarity, cardSet, hero, dbfId, cardId, _id);
    }

    handleClick = (event) => {


        event.preventDefault()
        this.addToDeck(this.props.name, this.props.mana, this.props.rarity, this.props.cardSet, this.props.hero, this.props.dbfId, this.props.cardId, this.props._id)
        this.setState({clicked: true})



        setTimeout(() => {
            this.fadeOut()
        }, 1000)

    }

    fadeOut = () => {
        this.setState({clicked: false})
        
    }

    render() {


        if (!this.props.buildMode) {
            return (<div/>)
        }

        return (
                <div onClick={this.handleClick}>
                    <i class="fas fa-plus-circle add-button hvr-push"></i>
                    {/* <div>
                        <div className={this.state.clicked ? 'msg-fade-in' : 'msg-fade-out'}>Added to deck</div>
                    </div> */}
                </div>
        )
    }
}